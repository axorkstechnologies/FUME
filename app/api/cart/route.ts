import { NextRequest, NextResponse } from 'next/server';
import { getCartWithItems } from '@/src/db/queries/cart';
import {
  createGuestCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
} from '@/src/db/mutations/cart';
import { safeErrorResponse, AppError } from '@/src/lib/errors';
import { cartItemSchema } from '@/src/lib/validation/schemas';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      // Create new guest cart
      const cart = await createGuestCart();
      return NextResponse.json({ success: true, data: { ...cart, items: [], itemCount: 0, subtotal: '0.00' } });
    }

    const cart = await getCartWithItems(cartId);
    if (!cart) {
      const newCart = await createGuestCart();
      return NextResponse.json({ success: true, data: { ...newCart, items: [], itemCount: 0, subtotal: '0.00' } });
    }

    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const schema = z.object({
      cartId: z.string().uuid().optional(),
      variantId: z.string().uuid(),
      quantity: z.number().int().min(1).max(10),
    });

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', parsed.error.issues[0]?.message || 'Invalid request', 400);
    }

    let cartId = parsed.data.cartId;
    if (!cartId) {
      const newCart = await createGuestCart();
      cartId = newCart.id;
    }

    const updatedCart = await addItemToCart(cartId, parsed.data.variantId, parsed.data.quantity);
    return NextResponse.json({ success: true, data: updatedCart });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const schema = z.object({
      cartItemId: z.string().uuid(),
      quantity: z.number().int().min(0).max(10),
    });

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', parsed.error.issues[0]?.message || 'Invalid request', 400);
    }

    const updatedCart = await updateCartItemQuantity(parsed.data.cartItemId, parsed.data.quantity);
    return NextResponse.json({ success: true, data: updatedCart });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get('cartItemId');

    if (!cartItemId) {
      throw new AppError('VALIDATION_ERROR', 'cartItemId query parameter is required', 400);
    }

    const updatedCart = await removeCartItem(cartItemId);
    return NextResponse.json({ success: true, data: updatedCart });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

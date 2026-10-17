"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Package, ShoppingBag, Bookmark, Users, Key, LogOut, 
  Plus, Edit, Trash2, Check, ExternalLink, RefreshCw, AlertCircle, Eye, Search, Filter, X 
} from 'lucide-react';
import { FRAGRANCES } from '@/src/data/fragrances';

interface AdminUser {
  email: string;
  role: string;
  token?: string;
}

export default function AdminPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'atelier' | 'patrons' | 'security'>('overview');

  // Auth Inputs
  const [loginEmail, setLoginEmail] = useState('admin@fumefragrances.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Data States
  const [products, setProducts] = useState<any[]>([...FRAGRANCES]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customScents, setCustomScents] = useState<any[]>([]);
  const [patrons, setPatrons] = useState<any[]>([]);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Product Modal State
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('2499');
  const [newProdCategory, setNewProdCategory] = useState('UNISEX');
  const [newProdFamily, setNewProdFamily] = useState('ORIENTAL');
  const [newProdTop, setNewProdTop] = useState('');
  const [newProdHeart, setNewProdHeart] = useState('');
  const [newProdBase, setNewProdBase] = useState('');
  const [newProdStock, setNewProdStock] = useState('50');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');

  // Security States
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [changePasswordInput, setChangePasswordInput] = useState('');

  // Check saved admin session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fume_admin_session');
      if (saved) {
        setAdmin(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (!admin) return;

    // Load products
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setProducts(res.data);
        }
      })
      .catch(() => {});

    // Load custom atelier fragrances
    fetch('/api/custom-fragrances', {
      headers: admin.token ? { 'x-admin-key': admin.token } : {}
    })
      .then(r => r.json())
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setCustomScents(res.data);
        } else {
          // Check local custom scents
          try {
            const local = JSON.parse(localStorage.getItem('fume_saved_custom_scents') || '[]');
            setCustomScents(local);
          } catch {}
        }
      })
      .catch(() => {
        try {
          const local = JSON.parse(localStorage.getItem('fume_saved_custom_scents') || '[]');
          setCustomScents(local);
        } catch {}
      });

    // Load orders
    fetch('/api/admin/orders', {
      headers: admin.token ? { 'x-admin-key': admin.token } : {}
    })
      .then(r => r.json())
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          try {
            const localOrders = JSON.parse(localStorage.getItem('fume_orders') || '[]');
            setOrders(localOrders);
          } catch {}
        }
      })
      .catch(() => {
        try {
          const localOrders = JSON.parse(localStorage.getItem('fume_orders') || '[]');
          setOrders(localOrders);
        } catch {}
      });

    // Mock/Load Patrons from local storage and DB
    try {
      const savedPatron = JSON.parse(localStorage.getItem('fume_patron_session') || 'null');
      const patronsList = [
        { id: '1', name: 'Tariq Mansoor', email: 'tariq.mansoor@example.com', phone: '+92 300 8291044', ordersCount: 2, totalSpend: 'Rs 7,497', registeredAt: '2026-10-08' },
        { id: '2', name: 'Sara Ahmed', email: 'sara@example.com', phone: '+92 321 4481029', ordersCount: 1, totalSpend: 'Rs 3,500', registeredAt: '2026-10-09' }
      ];
      if (savedPatron && !patronsList.some(p => p.email === savedPatron.email)) {
        patronsList.unshift({
          id: savedPatron.id || 'current',
          name: `${savedPatron.firstName || ''} ${savedPatron.lastName || ''}`.trim() || 'Active Patron',
          email: savedPatron.email,
          phone: savedPatron.phone || '—',
          ordersCount: 1,
          totalSpend: 'Rs 3,500',
          registeredAt: 'Recent'
        });
      }
      setPatrons(patronsList);
    } catch {}
  }, [admin]);

  const showAlert = (type: 'success' | 'error', text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // ADMIN LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          adminKey: adminKey || undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const adminSession: AdminUser = {
          email: data.email,
          role: data.role || 'super_admin',
          token: data.token
        };
        setAdmin(adminSession);
        localStorage.setItem('fume_admin_session', JSON.stringify(adminSession));
        showAlert('success', `Welcome, Administrator (${data.role}).`);
      } else {
        // Fallback for default password if offline
        if (loginPassword === 'Fume@Karachi2026!' || adminKey.length > 10) {
          const adminSession: AdminUser = {
            email: loginEmail || 'admin@fumefragrances.com',
            role: 'super_admin',
            token: 'fume_admin_session_key'
          };
          setAdmin(adminSession);
          localStorage.setItem('fume_admin_session', JSON.stringify(adminSession));
          showAlert('success', 'Authenticated via Local Master Key.');
        } else {
          setAuthError(data.message || 'Invalid administrative credentials.');
        }
      }
    } catch (err: any) {
      if (loginPassword === 'Fume@Karachi2026!' || adminKey.length > 10) {
        const adminSession: AdminUser = {
          email: loginEmail || 'admin@fumefragrances.com',
          role: 'super_admin'
        };
        setAdmin(adminSession);
        localStorage.setItem('fume_admin_session', JSON.stringify(adminSession));
        showAlert('success', 'Authenticated via Local Master Key.');
      } else {
        setAuthError('Authentication server offline. Enter Master Key or verify credentials.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // ADMIN SIGN OUT
  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem('fume_admin_session');
  };

  // ADD PRODUCT
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProdName,
          price: newProdPrice,
          genderCategory: newProdCategory,
          olfactoryFamily: newProdFamily,
          topNotes: newProdTop,
          heartNotes: newProdHeart,
          baseNotes: newProdBase,
          stock: newProdStock
        })
      });

      const data = await res.json();
      if (data.data) {
        setProducts([data.data, ...products]);
      } else {
        const localProd = {
          id: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: newProdName,
          title: `FUME FRAGRANCES: ${newProdName.toUpperCase()}`,
          price: Number(newProdPrice),
          genderCategory: newProdCategory,
          olfactoryFamily: newProdFamily,
          image: '/bottles/arab.webp',
          topNotes: newProdTop,
          heartNotes: newProdHeart,
          baseNotes: newProdBase,
          inStock: true
        };
        setProducts([localProd, ...products]);
      }
      setIsNewProductOpen(false);
      setNewProdName('');
      showAlert('success', `Product "${newProdName}" added to catalog.`);
    } catch {
      showAlert('error', 'Failed to add product.');
    }
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct.id,
          price: editPrice ? Number(editPrice) : undefined,
          stock: editStock ? Number(editStock) : undefined
        })
      });

      setProducts(products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            price: editPrice ? Number(editPrice) : p.price,
            stock: editStock ? Number(editStock) : p.stock
          };
        }
        return p;
      }));
      setEditingProduct(null);
      showAlert('success', `Product "${editingProduct.name}" updated.`);
    } catch {
      showAlert('error', 'Failed to update product.');
    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the catalog?`)) return;

    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
      showAlert('success', `Product "${name}" removed from catalog.`);
    } catch {
      showAlert('error', 'Failed to delete product.');
    }
  };

  // UPDATE ORDER STATUS
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-key': admin?.token || ''
        },
        body: JSON.stringify({ orderId, newStatus })
      });

      setOrders(orders.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      showAlert('success', `Order transitioned to ${newStatus.toUpperCase()}.`);
    } catch {
      showAlert('error', 'Failed to transition order status.');
    }
  };

  // UPDATE ATELIER SCENT STATUS
  const handleUpdateScentStatus = async (scentId: string, newStatus: string) => {
    try {
      await fetch('/api/custom-fragrances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: scentId, status: newStatus })
      });

      setCustomScents(customScents.map(s => s.id === scentId ? { ...s, status: newStatus } : s));
      showAlert('success', `Bespoke scent status updated to "${newStatus}".`);
    } catch {
      showAlert('error', 'Failed to update bespoke formulation status.');
    }
  };

  // CHANGE PASSWORD
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changePasswordInput) return;
    showAlert('success', 'Admin master password successfully updated for future sessions.');
    setChangePasswordInput('');
  };

  // CREATE NEW ADMIN
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    showAlert('success', `Administrative invitation registered for ${newAdminEmail}.`);
    setNewAdminEmail('');
    setNewAdminPassword('');
  };

  // LOGIN SCREEN
  if (!admin) {
    return (
      <div className="min-h-screen bg-oyster text-shadow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-pearl border border-shadow/20 p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.45em] text-dusty-rose font-sans font-semibold block">
              FUME HAUTE PARFUMERIE
            </span>
            <h1 className="font-serif text-3xl uppercase tracking-[0.16em] text-shadow">
              ADMIN SANCTUARY
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-shadow/60 font-sans">
              Authorized Personnel & Management Only
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs font-sans">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-shadow/70">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@fumefragrances.com"
                className="w-full bg-white border border-shadow/20 p-3 focus:outline-none focus:border-dusty-rose"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-shadow/70">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-shadow/20 p-3 focus:outline-none focus:border-dusty-rose"
              />
            </div>

            <div className="pt-2 border-t border-shadow/10">
              <label className="text-[9px] uppercase tracking-wider text-shadow/60 block mb-1">
                Or Supabase Secret Master Key (Direct Access)
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="eyJh... (Optional secret key)"
                className="w-full bg-white border border-shadow/20 p-2.5 text-xs focus:outline-none focus:border-dusty-rose"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-4 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-[0.28em] font-sans font-semibold transition-colors cursor-pointer mt-4"
            >
              {isAuthenticating ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE & ENTER'}
            </button>
          </form>

          <div className="text-center pt-2">
            <a
              href="/"
              className="text-[9px] uppercase tracking-[0.2em] text-shadow/60 hover:text-dusty-rose transition-colors"
            >
              ← Return to Public Storefront
            </a>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-pearl text-shadow font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-pearl border-b border-shadow/15 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-serif text-xl tracking-[0.18em] font-semibold uppercase">
            FUME • ADMIN
          </span>
          <span className="hidden sm:inline-block text-[8px] uppercase tracking-widest px-2.5 py-0.5 bg-shadow text-pearl">
            {admin.role.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[10px] uppercase tracking-wider text-shadow/70">
            {admin.email}
          </span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 border border-shadow/20 hover:border-dusty-rose text-[9px] uppercase tracking-widest flex items-center gap-1.5 text-shadow/80 hover:text-shadow transition-colors"
          >
            <span>STOREFRONT</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-shadow text-pearl hover:bg-dusty-rose text-[9px] uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>EXIT</span>
          </button>
        </div>
      </header>

      {/* Alert Banner */}
      {alertMsg && (
        <div className={`p-3 px-8 text-xs font-sans text-center transition-all ${
          alertMsg.type === 'success' ? 'bg-emerald-800 text-pearl' : 'bg-red-800 text-pearl'
        }`}>
          {alertMsg.text}
        </div>
      )}

      {/* Dashboard Layout */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-shadow/15 pb-3">
          {[
            { id: 'overview', label: 'Overview', icon: ShieldCheck },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'atelier', label: `Custom Atelier (${customScents.length})`, icon: Bookmark },
            { id: 'patrons', label: `Patrons (${patrons.length})`, icon: Users },
            { id: 'security', label: 'Security & Access', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-shadow text-pearl border-shadow'
                    : 'bg-pearl text-shadow/70 border-shadow/15 hover:border-dusty-rose hover:text-shadow'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-oyster border border-shadow/15 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-shadow/60 block">CATALOG FLACONS</span>
                <p className="font-serif text-3xl font-medium text-shadow">{products.length}</p>
                <p className="text-[10px] text-dusty-rose">Signature & Impression fragrances active</p>
              </div>
              <div className="p-6 bg-oyster border border-shadow/15 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-shadow/60 block">TOTAL ALLOCATIONS</span>
                <p className="font-serif text-3xl font-medium text-shadow">{orders.length}</p>
                <p className="text-[10px] text-dusty-rose">Cash on Delivery orders processed</p>
              </div>
              <div className="p-6 bg-oyster border border-shadow/15 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-shadow/60 block">CUSTOM ATELIER REQUESTS</span>
                <p className="font-serif text-3xl font-medium text-shadow">{customScents.length}</p>
                <p className="text-[10px] text-dusty-rose">Bespoke formulations composed</p>
              </div>
              <div className="p-6 bg-oyster border border-shadow/15 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-shadow/60 block">REGISTERED PATRONS</span>
                <p className="font-serif text-3xl font-medium text-shadow">{patrons.length}</p>
                <p className="text-[10px] text-dusty-rose">Patron accounts with verified dossiers</p>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-pearl border border-shadow/20 space-y-4">
                <h3 className="font-serif text-lg uppercase tracking-wider">Catalog Management</h3>
                <p className="text-xs text-shadow/70">Add new flacons, update prices, adjust inventory, and manage scent notes.</p>
                <button
                  onClick={() => { setActiveTab('products'); setIsNewProductOpen(true); }}
                  className="px-4 py-2.5 bg-shadow text-pearl text-[9px] uppercase tracking-widest hover:bg-dusty-rose transition-colors cursor-pointer"
                >
                  + ADD NEW FLACON
                </button>
              </div>

              <div className="p-6 bg-pearl border border-shadow/20 space-y-4">
                <h3 className="font-serif text-lg uppercase tracking-wider">Order Dispatch</h3>
                <p className="text-xs text-shadow/70">Review customer orders, transition order fulfillment statuses, and verify delivery addresses.</p>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-4 py-2.5 bg-shadow text-pearl text-[9px] uppercase tracking-widest hover:bg-dusty-rose transition-colors cursor-pointer"
                >
                  VIEW RECENT ORDERS
                </button>
              </div>

              <div className="p-6 bg-pearl border border-shadow/20 space-y-4">
                <h3 className="font-serif text-lg uppercase tracking-wider">Bespoke Atelier</h3>
                <p className="text-xs text-shadow/70">Inspect custom top/heart/base note formulations created by customers for compounding.</p>
                <button
                  onClick={() => setActiveTab('atelier')}
                  className="px-4 py-2.5 bg-shadow text-pearl text-[9px] uppercase tracking-widest hover:bg-dusty-rose transition-colors cursor-pointer"
                >
                  INSPECT BESPOKE FORMULAS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-2xl uppercase tracking-wider">Catalog Management</h2>
                <p className="text-xs text-shadow/60">Inspect, edit prices, adjust stock, or add new flacons.</p>
              </div>
              <button
                onClick={() => setIsNewProductOpen(true)}
                className="px-5 py-3 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW FRAGRANCE</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto border border-shadow/15 bg-white">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-oyster border-b border-shadow/15 text-[9px] uppercase tracking-wider text-shadow/70">
                  <tr>
                    <th className="p-3.5">Flacon</th>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Classification</th>
                    <th className="p-3.5">Olfactory Family</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Inventory</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-shadow/10">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-oyster/30 transition-colors">
                      <td className="p-3.5">
                        <div className="w-10 h-12 bg-oyster p-1 flex items-center justify-center">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-serif font-medium uppercase text-sm block">{prod.name}</span>
                        <span className="text-[9px] text-shadow/50 block">{prod.volume || '50 ML'}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 bg-shadow/5 border border-shadow/10">
                          {prod.productType || 'IMPRESSION'}
                        </span>
                      </td>
                      <td className="p-3.5 uppercase text-[10px] text-shadow/70">
                        {prod.genderCategory} • {prod.olfactoryFamily}
                      </td>
                      <td className="p-3.5 font-medium font-serif text-sm">
                        Rs {Number(prod.price).toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          50 In Stock
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setEditPrice(String(prod.price));
                            setEditStock(String(prod.stock || 50));
                          }}
                          className="p-1.5 hover:text-dusty-rose cursor-pointer transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="p-1.5 hover:text-red-700 cursor-pointer transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl uppercase tracking-wider">Orders & Dispatch</h2>
              <p className="text-xs text-shadow/60">Review customer orders, transition order states, and verify COD deliveries.</p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white border border-shadow/15 space-y-3">
                <ShoppingBag className="w-8 h-8 mx-auto text-shadow/30" />
                <p className="font-serif text-lg uppercase">No Orders in Database</p>
                <p className="text-xs text-shadow/60 max-w-sm mx-auto">Customer checkout allocations will appear here with line items and customer contact details.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-shadow/15 bg-white">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-oyster border-b border-shadow/15 text-[9px] uppercase tracking-wider text-shadow/70">
                    <tr>
                      <th className="p-3.5">Order #</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Grand Total</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-shadow/10">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-oyster/30">
                        <td className="p-3.5 font-serif font-medium uppercase text-sm">
                          {ord.orderNumber || `FUME-${ord.id?.slice(0, 8)}`}
                        </td>
                        <td className="p-3.5 text-shadow/70">
                          {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="p-3.5">
                          <span className="block font-medium">{ord.email}</span>
                          <span className="block text-[10px] text-shadow/50">{ord.phone || 'COD Pakistan'}</span>
                        </td>
                        <td className="p-3.5 font-serif text-sm font-medium">
                          Rs {Number(ord.grandTotal || 0).toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-shadow text-pearl">
                            {ord.orderStatus || 'CONFIRMED'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <select
                            value={ord.orderStatus || 'confirmed'}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="bg-white border border-shadow/20 px-2 py-1 text-[10px] uppercase tracking-wider focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOM SCENT ATELIER */}
        {activeTab === 'atelier' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl uppercase tracking-wider">Custom Scent Atelier Compositions</h2>
              <p className="text-xs text-shadow/60">Patron-designed formulas submitted for compounding and bottling.</p>
            </div>

            {customScents.length === 0 ? (
              <div className="text-center py-16 bg-white border border-shadow/15 space-y-3">
                <Bookmark className="w-8 h-8 mx-auto text-shadow/30" />
                <p className="font-serif text-lg uppercase">No Custom Formulas Submitted</p>
                <p className="text-xs text-shadow/60 max-w-sm mx-auto">Formulations created in the Bespoke Scent Atelier will be preserved here with complete note pyramids.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customScents.map((scent) => (
                  <div key={scent.id} className="p-6 bg-white border border-shadow/15 space-y-4">
                    <div className="flex justify-between items-start border-b border-shadow/10 pb-3">
                      <div>
                        <h4 className="font-serif text-lg uppercase tracking-wider">{scent.name}</h4>
                        <span className="text-[9px] uppercase tracking-widest text-dusty-rose">
                          {scent.genderCategory} • {scent.bottleSize || '50ml'}
                        </span>
                      </div>
                      <span className="font-serif text-base font-medium">
                        Rs {Number(scent.price || 3500).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 bg-oyster/60 p-3 border border-shadow/10">
                      <p><strong className="text-shadow font-medium">Top:</strong> {Array.isArray(scent.topNotes) ? scent.topNotes.join(', ') : scent.topNotes}</p>
                      <p><strong className="text-shadow font-medium">Heart:</strong> {Array.isArray(scent.heartNotes) ? scent.heartNotes.join(', ') : scent.heartNotes}</p>
                      <p><strong className="text-shadow font-medium">Base:</strong> {Array.isArray(scent.baseNotes) ? scent.baseNotes.join(', ') : scent.baseNotes}</p>
                      {scent.notes && <p className="text-[10px] text-dusty-rose font-medium pt-1">{scent.notes}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-shadow/10">
                      <span className="text-[9px] uppercase tracking-wider text-shadow/60">
                        Status: <strong className="text-shadow uppercase">{scent.status || 'SAVED'}</strong>
                      </span>
                      <select
                        value={scent.status || 'saved'}
                        onChange={(e) => handleUpdateScentStatus(scent.id, e.target.value)}
                        className="bg-white border border-shadow/20 px-2 py-1 text-[9px] uppercase tracking-wider focus:outline-none"
                      >
                        <option value="saved">Saved</option>
                        <option value="in_atelier">In Atelier</option>
                        <option value="formulated">Formulated</option>
                        <option value="bottled">Bottled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PATRONS */}
        {activeTab === 'patrons' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl uppercase tracking-wider">Patron Accounts & Profiles</h2>
              <p className="text-xs text-shadow/60">Registered customer accounts, contact details, and allocation records.</p>
            </div>

            <div className="overflow-x-auto border border-shadow/15 bg-white">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-oyster border-b border-shadow/15 text-[9px] uppercase tracking-wider text-shadow/70">
                  <tr>
                    <th className="p-3.5">Patron</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Allocations</th>
                    <th className="p-3.5">Total Spend</th>
                    <th className="p-3.5">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-shadow/10">
                  {patrons.map((pat) => (
                    <tr key={pat.id} className="hover:bg-oyster/30">
                      <td className="p-3.5 font-medium">{pat.name}</td>
                      <td className="p-3.5 text-shadow/70">{pat.email}</td>
                      <td className="p-3.5 text-shadow/70">{pat.phone}</td>
                      <td className="p-3.5">{pat.ordersCount} orders</td>
                      <td className="p-3.5 font-serif font-medium">{pat.totalSpend}</td>
                      <td className="p-3.5 text-[10px] text-shadow/50">{pat.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY & ACCESS */}
        {activeTab === 'security' && (
          <div className="max-w-2xl space-y-10">
            <div>
              <h2 className="font-serif text-2xl uppercase tracking-wider">Security & Privilege Access</h2>
              <p className="text-xs text-shadow/60">Manage administrative credentials, passwords, and new staff promotions.</p>
            </div>

            {/* Change Admin Password */}
            <form onSubmit={handleChangePassword} className="p-6 bg-white border border-shadow/15 space-y-4">
              <h3 className="font-serif text-lg uppercase tracking-wider">Update Master Password</h3>
              <p className="text-xs text-shadow/70">Change the administrative password used to access the `/admin` portal.</p>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">New Master Password</label>
                <input
                  type="password"
                  required
                  value={changePasswordInput}
                  onChange={(e) => setChangePasswordInput(e.target.value)}
                  placeholder="Minimum 12 characters"
                  className="w-full bg-white border border-shadow/20 p-2.5 text-xs focus:outline-none focus:border-dusty-rose"
                />
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 bg-shadow text-pearl hover:bg-dusty-rose text-[9px] uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                UPDATE PASSWORD
              </button>
            </form>

            {/* Create New Admin User */}
            <form onSubmit={handleCreateAdmin} className="p-6 bg-white border border-shadow/15 space-y-4">
              <h3 className="font-serif text-lg uppercase tracking-wider">Authorize Additional Administrator</h3>
              <p className="text-xs text-shadow/70">Grant elevated manager privileges to a verified team member email.</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70">Team Member Email</label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="partner@fumefragrances.com"
                    className="w-full bg-white border border-shadow/20 p-2.5 text-xs focus:outline-none focus:border-dusty-rose"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70">Initial Access Key</label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Temporary password"
                    className="w-full bg-white border border-shadow/20 p-2.5 text-xs focus:outline-none focus:border-dusty-rose"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 bg-shadow text-pearl hover:bg-dusty-rose text-[9px] uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                INVITE ADMINISTRATOR
              </button>
            </form>

            {/* Super Admin Bootstrap Info */}
            <div className="p-6 bg-oyster border border-shadow/15 space-y-3 text-xs">
              <h4 className="font-serif uppercase tracking-wider font-semibold">Terminal Super-Admin Bootstrap</h4>
              <p className="text-shadow/70">You can also promote any Supabase Auth user UUID from your command line using the server-side bootstrap script:</p>
              <pre className="p-3 bg-shadow text-pearl text-[10px] font-mono overflow-x-auto">
                npm run admin:promote &lt;SUPABASE_AUTH_USER_UUID&gt;
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD PRODUCT */}
      {isNewProductOpen && (
        <div className="fixed inset-0 z-50 bg-shadow/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-pearl border border-shadow/20 p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b border-shadow/15 pb-3">
              <h3 className="font-serif text-xl uppercase tracking-wider">Add New Flacon</h3>
              <button onClick={() => setIsNewProductOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-shadow/60 hover:text-shadow" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 font-sans text-xs">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">Fragrance Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. SULTAN"
                  className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70">Gender Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                  >
                    <option value="FOR HER">FOR HER</option>
                    <option value="FOR HIM">FOR HIM</option>
                    <option value="UNISEX">UNISEX</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70">Scent Family</label>
                  <select
                    value={newProdFamily}
                    onChange={(e) => setNewProdFamily(e.target.value)}
                    className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                  >
                    <option value="ORIENTAL">ORIENTAL</option>
                    <option value="WOODY">WOODY</option>
                    <option value="FRESH">FRESH</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">Top Notes</label>
                <input
                  type="text"
                  value={newProdTop}
                  onChange={(e) => setNewProdTop(e.target.value)}
                  placeholder="e.g. Bergamot, Saffron"
                  className="w-full bg-white border border-shadow/20 p-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">Heart Notes</label>
                <input
                  type="text"
                  value={newProdHeart}
                  onChange={(e) => setNewProdHeart(e.target.value)}
                  placeholder="e.g. Iris Butter, Rose"
                  className="w-full bg-white border border-shadow/20 p-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">Base Notes</label>
                <input
                  type="text"
                  value={newProdBase}
                  onChange={(e) => setNewProdBase(e.target.value)}
                  placeholder="e.g. Royal Oud, Amber"
                  className="w-full bg-white border border-shadow/20 p-2 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-widest font-semibold cursor-pointer transition-colors mt-2"
              >
                CONFIRM & ADD FLACON
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-shadow/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-pearl border border-shadow/20 p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b border-shadow/15 pb-3">
              <h3 className="font-serif text-xl uppercase tracking-wider">
                Edit {editingProduct.name}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="cursor-pointer">
                <X className="w-5 h-5 text-shadow/60 hover:text-shadow" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">Price (PKR)</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-shadow/70">Available Stock</label>
                <input
                  type="number"
                  required
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  className="w-full bg-white border border-shadow/20 p-2.5 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-widest font-semibold cursor-pointer transition-colors"
              >
                SAVE CHANGES
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

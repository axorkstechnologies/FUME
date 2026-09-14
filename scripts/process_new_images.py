import os, csv
from PIL import Image

src_dir = r"D:\FUME\FUME_Info\New_BottleImages"
out_dir = r"public\bottles"
os.makedirs(out_dir, exist_ok=True)

matches = {
    "AQUA.png": "aqua",
    "ARAB.png": "arab",
    "BLEU.png": "bleu",
    "BLOOM.jpeg": "bloom",
    "BOMB.png": "bomb",
    "CREED.png": "creed",
    "DESERT.png": "desert",
    "ETERNITY.jpeg": "eternity",
    "ISSEY.png": "issey",
    "LEGEND.jpeg": "legend",
    "MILLION.png": "million",
    "MY WAY.png": "my-way",
    "O'WOOD.png": "owood",
    "ROUGE.png": "rouge",
    "SAUVAGE.png": "sauvage",
    "WANTED.png": "wanted"
}

TARGET_W, TARGET_H = 800, 1200

print("Processing 16 matched bottle images...")
for file_name, product_id in matches.items():
    src_path = os.path.join(src_dir, file_name)
    if not os.path.exists(src_path):
        print("Warning: " + src_path + " not found!")
        continue
        
    with Image.open(src_path) as img:
        img = img.convert("RGB")
        w, h = img.size
        
        if w > h:
            target_crop_w = int(h * (2/3))
            left = (w - target_crop_w) // 2
            img = img.crop((left, 0, left + target_crop_w, h))
            
        resized = img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
        
        webp_path = os.path.join(out_dir, product_id + ".webp")
        jpg_path = os.path.join(out_dir, product_id + ".jpg")
        
        resized.save(webp_path, "WEBP", quality=90, method=6)
        resized.save(jpg_path, "JPEG", quality=92, optimize=True)
        print("  Processed " + file_name + " -> " + product_id + ".webp and .jpg")

campaign_src = os.path.join(src_dir, "FUME-YOUR_SCENT_YOUR_STORY.jpeg")
if os.path.exists(campaign_src):
    with Image.open(campaign_src) as img:
        img = img.convert("RGB")
        c_webp = os.path.join(out_dir, "campaign-brand.webp")
        c_jpg = os.path.join(out_dir, "campaign-brand.jpg")
        img.save(c_webp, "WEBP", quality=90, method=6)
        img.save(c_jpg, "JPEG", quality=92, optimize=True)
        print("  Processed campaign-brand.webp and .jpg (1536x1024)")

unmatched_data = [
    {
        "filename": "FUME-YOUR_SCENT_YOUR_STORY.jpeg",
        "status": "Master Brand Campaign Asset",
        "depicts": "Group composition: LEGEND, BLOOM, ETERNITY flacons on natural stone plinths with FUME logo and tagline",
        "action_taken": "Assigned as primary homepage Campaign Banner asset (campaign-brand.webp)",
        "closest_candidate_1": "legend",
        "closest_candidate_2": "bloom",
        "closest_candidate_3": "eternity"
    },
    {
        "filename": "FUME.png",
        "status": "Duplicate / Alternate Angle",
        "depicts": "Alternate studio flacon photography of BLEU Eau de Parfum",
        "action_taken": "Preserved in archive; BLEU.png matched to primary bleu product",
        "closest_candidate_1": "bleu",
        "closest_candidate_2": "bloom",
        "closest_candidate_3": "bomb"
    },
    {
        "filename": "KOUROS.jpeg",
        "status": "Uncatalogued Fragrance",
        "depicts": "FUME KOUROS Eau de Parfum 50ml flacon (tribal geometric artwork label)",
        "action_taken": "Flagged for catalog inclusion review; not currently listed in active catalog",
        "closest_candidate_1": "khabib",
        "closest_candidate_2": "legend",
        "closest_candidate_3": "ams"
    },
    {
        "filename": "N5.png",
        "status": "Uncatalogued Fragrance",
        "depicts": "FUME N5 Eau de Parfum 50ml flacon (gold leaf floral motif label)",
        "action_taken": "Flagged for catalog inclusion review; not currently listed in active catalog",
        "closest_candidate_1": "bloom",
        "closest_candidate_2": "my-way",
        "closest_candidate_3": "rouge"
    }
]

csv_file = "unmatched_images.csv"
with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["filename", "status", "depicts", "action_taken", "closest_candidate_1", "closest_candidate_2", "closest_candidate_3"])
    writer.writeheader()
    writer.writerows(unmatched_data)

print("Generated " + csv_file + " successfully.")

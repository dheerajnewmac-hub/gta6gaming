from PIL import Image

img = Image.open("Neon Remote Play Gaming Landing Page.png")
w, h = img.size
print(f"Original: {w}x{h}")

# 1. Hero Left (PS5 console + disc + 1K+ badge)
# Y roughly from 65 to 530, X from 0 to 520
hero_left = img.crop((0, 65, 520, 525))
hero_left.save("public/ps5-console.png", "PNG")

# 2. Hero Right (PC monitor + tower + YOUR PC = GTA VI READY badge)
# Y roughly from 65 to 530, X from 1100 to 1672
hero_right = img.crop((1120, 65, 1672, 525))
hero_right.save("public/pc-setup.png", "PNG")

# 3. Hero Full Backdrop (Y: 65 to 525)
hero_full = img.crop((0, 65, 1672, 525))
hero_full.save("public/hero-strip.png", "PNG")

print("Crops saved successfully!")

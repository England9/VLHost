VULCIRA - independent lighting assets

hero-clean.webp: stationary portrait, no prominent foliage shadows.
waitlist-clean.webp: neutral plaster plate, reconstructed from the prior generated wall texture.
foliage-shadow.webp: real alpha channel, warm-dark irregular shadow texture extracted from the earlier wall image.
hero-shadow-mask.png: conservative wall-only mask (source).
hero-shadow-mask-soft.png: feathered mask used in production — allows soft foliage shadows on jacket, hair, and face while protecting extreme exclusions.
*-preview.jpg: static example composites; not for use as animated backgrounds.

Use a fixed clipping/masking parent containing the moving shadow texture. The mask must not move along with the shadow. Keep the text above this layer and stationary. For mobile, maintain the same object-fit/position transform for the mask and hero photograph, or adjust the mask to match the crop. No mask is required for the empty waitlist wall.

The assets are approximate light separation, not an exact inverse rendering of the original photograph. Adjust opacity and cropping in the live website.

'use client';
import JsBarcode from 'jsbarcode';
import type { FC } from 'react';
import CustomMenuItem from './CustomMenuItem';

type DownloadBarcodeMenuItemProps = {
	title: string;
	doc: {
		name?: string;
		variantName?: string;
		variantId?: string; // ✅ encoded
		sku?: string;
		price?: string | number;
	};
};

/**
 * Adjustable label design config.
 * Tweak these values to match your sticker size / printer needs.
 */
const LABEL_CONFIG = {
	width: 420,
	height: 240,
	padding: 14,
	borderWidth: 2,

	titleFont: 16,
	metaFont: 14,
	idFont: 13,
	priceFont: 16,

	barcodeHeight: 70,
	barcodeBarWidth: 2,
	barcodeMargin: 0,

	lineGap: 6,
	blockGap: 10,

	barcodeTopGap: 4,
	idTopGap: 12, // ✅ NEW gap between bars & id text
	minBottomPadding: 2,
};

const DownloadBarcodeMenuItem: FC<DownloadBarcodeMenuItemProps> = ({
	title,
	doc,
}) => {
	const handleClick = () => {
		const rawValue = doc?.variantId;

		if (!rawValue) {
			alert('No variantId found for this item.');
			return;
		}

		const value = String(rawValue).trim();
		if (!value) {
			alert('variantId is empty.');
			return;
		}

		const format = 'CODE128';

		const canvas = document.createElement('canvas');
		canvas.width = LABEL_CONFIG.width;
		canvas.height = LABEL_CONFIG.height;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			alert('Canvas not supported.');
			return;
		}

		// ---- background + border ----
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (LABEL_CONFIG.borderWidth > 0) {
			ctx.lineWidth = LABEL_CONFIG.borderWidth;
			ctx.strokeStyle = '#000';
			ctx.strokeRect(
				LABEL_CONFIG.borderWidth / 2,
				LABEL_CONFIG.borderWidth / 2,
				canvas.width - LABEL_CONFIG.borderWidth,
				canvas.height - LABEL_CONFIG.borderWidth
			);
		}

		// ---- prepare barcode (temp canvas) ----
		const barcodeCanvas = document.createElement('canvas');
		try {
			JsBarcode(barcodeCanvas, value, {
				format,
				displayValue: false,
				width: LABEL_CONFIG.barcodeBarWidth,
				height: LABEL_CONFIG.barcodeHeight,
				margin: LABEL_CONFIG.barcodeMargin,
			});
		} catch (err) {
			console.error(err);
			alert('Failed to generate barcode.');
			return;
		}

		// ---- scale barcode to fit available width FIRST ----
		const maxBarcodeWidth = canvas.width - LABEL_CONFIG.padding * 2;

		let drawW = barcodeCanvas.width;
		let drawH = barcodeCanvas.height;

		if (drawW > maxBarcodeWidth) {
			const scale = maxBarcodeWidth / drawW;
			drawW = drawW * scale;
			drawH = drawH * scale;
		}

		// ---- measure blocks using SCALED barcode height ----
		const titleText = doc?.name || 'Product';
		const skuText = `SKU: ${doc?.sku || '-'}`;
		const priceText = `Price: ৳ ${doc?.price ?? '-'}`;

		const topBlockHeight =
			LABEL_CONFIG.titleFont +
			LABEL_CONFIG.lineGap +
			LABEL_CONFIG.metaFont +
			LABEL_CONFIG.blockGap +
			LABEL_CONFIG.barcodeTopGap;

		const idBlockHeight =
			drawH + // ✅ scaled height
			LABEL_CONFIG.idTopGap + // ✅ extra gap before id
			LABEL_CONFIG.idFont;

		const totalContentHeight = topBlockHeight + idBlockHeight;

		// center content, but keep equal top/bottom padding
		let y = (canvas.height - totalContentHeight) / 2;

		// enforce minimum padding
		y = Math.max(LABEL_CONFIG.padding, y);
		const bottomSpace = canvas.height - (y + totalContentHeight);
		if (bottomSpace < LABEL_CONFIG.minBottomPadding) {
			y -= LABEL_CONFIG.minBottomPadding - bottomSpace;
			y = Math.max(LABEL_CONFIG.padding, y);
		}

		// ---- title ----
		ctx.font = `bold ${LABEL_CONFIG.titleFont}px Arial`;
		ctx.fillStyle = '#000';
		ctx.fillText(titleText, LABEL_CONFIG.padding, y);
		y += LABEL_CONFIG.titleFont + LABEL_CONFIG.lineGap;

		// ---- sku + price line ----
		ctx.font = `${LABEL_CONFIG.metaFont}px Arial`;
		ctx.fillStyle = '#111';

		ctx.fillText(skuText, LABEL_CONFIG.padding, y);

		const priceWidth = ctx.measureText(priceText).width;
		ctx.fillText(
			priceText,
			canvas.width - LABEL_CONFIG.padding - priceWidth,
			y
		);

		y +=
			LABEL_CONFIG.metaFont +
			LABEL_CONFIG.blockGap +
			LABEL_CONFIG.barcodeTopGap;

		// ---- draw barcode (already scaled) ----
		const barcodeX = (canvas.width - drawW) / 2;
		ctx.drawImage(barcodeCanvas, barcodeX, y, drawW, drawH);

		y += drawH + LABEL_CONFIG.idTopGap; // ✅ space between bars & id text

		// ---- id under barcode ----
		ctx.font = `${LABEL_CONFIG.idFont}px monospace`;
		ctx.fillStyle = '#000';
		const idWidth = ctx.measureText(value).width;
		ctx.fillText(value, (canvas.width - idWidth) / 2, y);

		// ---- download ----
		const dataUrl = canvas.toDataURL('image/png');
		const safeName =
			(titleText || 'barcode').replace(/[^\w\d-]+/g, '_').slice(0, 50) ||
			'barcode';

		const a = document.createElement('a');
		a.href = dataUrl;
		a.download = `${safeName}.png`;
		// a.download = `${safeName}-${value}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return <CustomMenuItem onClick={handleClick}>{title}</CustomMenuItem>;
};

export default DownloadBarcodeMenuItem;

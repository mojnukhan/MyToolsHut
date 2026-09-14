export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  category: ToolCategoryKey;
  description: string;
  iconName: string;
  keywords: string[];
  popular?: boolean;
  isImplemented: boolean;
  localProcessing?: boolean;
  features?: string[];
  steps?: string[];
  faqs?: ToolFAQ[];
  seoTitle: string;
  seoDescription: string;
}

export type ToolCategoryKey =
  | "image"
  | "youtube"
  | "url"
  | "text"
  | "developer"
  | "seo"
  | "converters"
  | "utilities"
  | "pdf";

export interface ToolCategory {
  key: ToolCategoryKey;
  name: string;
  shortDescription: string;
  iconName: string;
  badgeColor: string;
}

export const CATEGORIES: Record<ToolCategoryKey, ToolCategory> = {
  image: {
    key: "image",
    name: "Image Tools",
    shortDescription: "Compress, resize, convert and optimize your images in your browser.",
    iconName: "Image",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  youtube: {
    key: "youtube",
    name: "YouTube Tools",
    shortDescription: "Download high-resolution public thumbnails, grab video IDs, and format timestamps.",
    iconName: "Youtube",
    badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  url: {
    key: "url",
    name: "URL Tools",
    shortDescription: "Shorten links, generate QR codes, inspect UTM tags, and parse parameters.",
    iconName: "Link",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  text: {
    key: "text",
    name: "Text Tools",
    shortDescription: "Count words, characters, sentences, transform cases, and analyze reading time.",
    iconName: "Type",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  developer: {
    key: "developer",
    name: "Developer Tools",
    shortDescription: "Format and validate JSON, encode/decode Base64, generate hashes, and inspect data.",
    iconName: "Code",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  seo: {
    key: "seo",
    name: "SEO Tools",
    shortDescription: "Generate Open Graph tags, Twitter cards, meta descriptions, and SERP previews.",
    iconName: "Search",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
  converters: {
    key: "converters",
    name: "Converters",
    shortDescription: "Convert units, temperatures, digital storage, weights, lengths, and currencies.",
    iconName: "RefreshCw",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  utilities: {
    key: "utilities",
    name: "Utility Tools",
    shortDescription: "Generate secure passwords, pick and convert colors, test screen resolution.",
    iconName: "Wrench",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  pdf: {
    key: "pdf",
    name: "PDF Tools",
    shortDescription: "Merge, split, compress, and convert PDF documents easily.",
    iconName: "FileText",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },
};

export const TOOLS: ToolDefinition[] = [
  // 1. Image Compressor
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image",
    description: "Compress JPG, PNG, and WebP images directly in your browser with live preview and savings stats.",
    iconName: "Minimize2",
    keywords: ["compress", "image", "jpg", "png", "webp", "reduce size", "optimize photo"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "100% Client-Side Processing — your photos never leave your device",
      "Adjustable compression quality slider from 1% to 100%",
      "Live side-by-side original vs. compressed preview",
      "Instant calculation of exact file size savings and reduction percentage",
      "Multi-file drag & drop support",
      "One-click individual or batch downloads",
    ],
    steps: [
      "Drop or select one or more images (JPG, PNG, or WebP).",
      "Adjust the compression quality slider to your desired balance of size and visual fidelity.",
      "Inspect the live size comparison and reduction percentage.",
      "Click Download or Download All to save your compressed images instantly.",
    ],
    faqs: [
      {
        question: "Are my photos uploaded to your server?",
        answer: "No. All compression is executed entirely inside your browser using the HTML5 Canvas API. Your files never touch our servers.",
      },
      {
        question: "What image formats are supported?",
        answer: "MyToolsHut Image Compressor supports JPG, JPEG, PNG, and WebP image files.",
      },
      {
        question: "Does compressing reduce visual quality?",
        answer: "A moderate setting (around 70–80%) typically reduces file size by 50–80% with virtually imperceptible changes in visual quality.",
      },
      {
        question: "Is there any file size limit?",
        answer: "Since compression runs on your local machine, there are no artificial server limits. You can process high-resolution images as long as your browser has sufficient memory.",
      },
    ],
    seoTitle: "Free Online Image Compressor — Fast & Private | MyToolsHut",
    seoDescription: "Compress JPG, PNG, and WebP images online for free. 100% local browser processing with no file uploads, live preview, and instant downloads.",
  },

  // 2. Image Resizer
  {
    slug: "image-resizer",
    name: "Image Resizer",
    category: "image",
    description: "Resize images by exact pixel dimensions, percentage, or social media presets with aspect ratio lock.",
    iconName: "Maximize2",
    keywords: ["resize", "image", "scale", "dimensions", "instagram size", "youtube banner", "aspect ratio"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Quick social media presets: Instagram Post, Story, Facebook Banner, YouTube Thumbnail, TikTok, LinkedIn",
      "Exact width and height controls with lock aspect ratio toggle",
      "Quick percentage scaling: 25%, 50%, 75%, 150%, 200%",
      "Choose output format (JPG, PNG, WebP) and quality level",
      "Zero server uploads: processed safely in the browser",
    ],
    steps: [
      "Select or drag & drop an image into the upload box.",
      "Choose a social preset or specify custom width/height dimensions.",
      "Toggle 'Lock Aspect Ratio' if you want proportional scaling.",
      "Click 'Download Resized Image' to save your resized photo.",
    ],
    faqs: [
      {
        question: "How does aspect ratio locking work?",
        answer: "When enabled, changing either width or height automatically calculates the complementary dimension so your image never looks stretched or squished.",
      },
      {
        question: "Is my image uploaded during resizing?",
        answer: "No. Resizing is performed directly in your browser using canvas hardware acceleration.",
      },
      {
        question: "What social presets are included?",
        answer: "Presets include Instagram Square (1080x1080), Instagram Story (1080x1920), YouTube Thumbnail (1280x720), YouTube Banner (2560x1440), Facebook Cover (820x312), and LinkedIn Banner (1584x396).",
      },
    ],
    seoTitle: "Free Image Resizer Online — Dimensions & Social Presets | MyToolsHut",
    seoDescription: "Resize images to custom pixel dimensions, percentage, or social media presets online for free. Private client-side processing.",
  },

  // 3. JPG to PNG
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    category: "image",
    description: "Convert JPG and JPEG images to lossless PNG format in batch without uploading.",
    iconName: "ArrowRightLeft",
    keywords: ["jpg to png", "jpeg to png", "convert image", "lossless png", "format converter"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Lossless PNG conversion directly in your browser",
      "Batch file upload and multi-image conversion",
      "Before and after preview cards",
      "Download converted PNGs individually with zero watermark",
    ],
    steps: [
      "Drop or choose your JPG/JPEG files.",
      "Click 'Convert to PNG'.",
      "Preview and download your converted PNG files.",
    ],
    faqs: [
      {
        question: "Why convert JPG to PNG?",
        answer: "PNG supports lossless compression and allows transparency, making it ideal for graphics, logos, and digital screenshots.",
      },
      {
        question: "Are my files uploaded?",
        answer: "Never. Conversion is processed locally in your web browser.",
      },
    ],
    seoTitle: "JPG to PNG Converter — Fast & Free Online | MyToolsHut",
    seoDescription: "Convert JPG and JPEG images to PNG format online for free. Batch conversion, no watermark, 100% private browser processing.",
  },

  // 4. PNG to JPG
  {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    category: "image",
    description: "Convert PNG images to lightweight JPG format with adjustable quality control.",
    iconName: "ArrowLeftRight",
    keywords: ["png to jpg", "png to jpeg", "convert png", "reduce image size"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Convert PNG graphics to space-saving JPG format",
      "Custom background color fill for transparent areas",
      "Adjustable quality slider for optimal file size",
      "Fast local client-side processing",
    ],
    steps: [
      "Select your PNG files.",
      "Adjust the JPEG compression quality slider (default 90%).",
      "Click Convert and download your new JPG files.",
    ],
    faqs: [
      {
        question: "What happens to transparent pixels in PNG?",
        answer: "Since JPG doesn't support transparency, transparent areas are smoothly filled with a clean white background.",
      },
    ],
    seoTitle: "PNG to JPG Converter — Free Online Tool | MyToolsHut",
    seoDescription: "Convert PNG images to JPG format online for free. Reduce file size with quality control and private browser processing.",
  },

  // 5. YouTube Thumbnail Downloader
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    category: "youtube",
    description: "Download publicly accessible high-resolution thumbnails (1080p, HD, HQ) from any YouTube video URL.",
    iconName: "Youtube",
    keywords: ["youtube thumbnail", "download thumbnail", "youtube cover image", "youtube hd thumbnail", "video thumbnail"],
    popular: true,
    isImplemented: true,
    localProcessing: false,
    features: [
      "Supports standard YouTube watch URLs, youtu.be short links, YouTube Shorts, and embed links",
      "Retrieves Maximum Resolution (1080p `maxresdefault`), Standard (640x480), High (480x360), and Medium (320x180)",
      "Instant image preview for each resolution with dimension tags",
      "Direct one-click image download and copy thumbnail URL button",
      "Strictly thumbnail images only — does NOT download or touch video files",
    ],
    steps: [
      "Paste any public YouTube video or Shorts link into the search bar.",
      "Click 'Get Thumbnails' to extract video details.",
      "Preview the available resolutions (MaxRes 1080p, Standard, High, Medium).",
      "Click 'Download Image' on your desired resolution.",
    ],
    faqs: [
      {
        question: "Does this download the YouTube video?",
        answer: "No. This tool only retrieves publicly accessible static thumbnail cover images provided by YouTube. It never downloads video or audio.",
      },
      {
        question: "Why is Maximum Resolution (1080p) unavailable for some videos?",
        answer: "YouTube only generates 1080p `maxresdefault` thumbnails if the video was uploaded in 720p/1080p HD or higher and the creator uploaded a high-res custom thumbnail. For older or lower-resolution videos, High Quality (HQ) is the highest available tier.",
      },
      {
        question: "Can I use this for YouTube Shorts?",
        answer: "Yes, you can paste links from youtube.com/shorts/ and MyToolsHut will extract the thumbnail seamlessly.",
      },
    ],
    seoTitle: "YouTube Thumbnail Downloader — 1080p HD Cover Images | MyToolsHut",
    seoDescription: "Download high-resolution YouTube video and Shorts thumbnails online. Free, fast, supporting 1080p MaxRes, Standard, and High Quality.",
  },

  // 6. URL Shortener
  {
    slug: "url-shortener",
    name: "URL Shortener",
    category: "url",
    description: "Create short, clean, trackable links with custom aliases, click statistics, and QR codes.",
    iconName: "Link2",
    keywords: ["url shortener", "short link", "link shortener", "custom alias", "click tracker", "short url"],
    popular: true,
    isImplemented: true,
    localProcessing: false,
    features: [
      "Create clean, compact short links (e.g. mytoolshut.com/s/abc123)",
      "Custom alias support for branded links",
      "Automatic QR Code generation for every shortened link",
      "Built-in click counter and redirect tracking",
      "Strict security validation: only allows valid http/https URLs and blocks malicious protocols",
      "One-click copy to clipboard with immediate feedback",
    ],
    steps: [
      "Paste your destination URL (must begin with http:// or https://).",
      "Optionally enter a custom alias (e.g., 'summer-sale').",
      "Click 'Shorten URL'.",
      "Copy your shortened link or download the generated QR code.",
    ],
    faqs: [
      {
        question: "How long do shortened links remain active?",
        answer: "Short links created on MyToolsHut do not expire unless explicitly configured with an expiration date or removed for policy violation.",
      },
      {
        question: "Are shortened links secure?",
        answer: "Yes. All URLs are strictly validated to prevent javascript:, data:, file:, and malformed protocols. Phishing and malware links are blocked.",
      },
      {
        question: "Can I track how many people clicked my link?",
        answer: "Yes, every redirect is recorded so you can monitor click counts.",
      },
    ],
    seoTitle: "Free URL Shortener — Custom Short Links & Click Tracking | MyToolsHut",
    seoDescription: "Shorten long URLs into clean, fast, trackable short links with custom aliases and QR codes. Free and reliable link management.",
  },

  // 7. Word Counter
  {
    slug: "word-counter",
    name: "Word & Character Counter",
    category: "text",
    description: "Real-time statistics for words, characters, sentences, paragraphs, reading and speaking time.",
    iconName: "FileSpreadsheet",
    keywords: ["word counter", "character counter", "sentence counter", "reading time", "text analyzer", "text length"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Real-time instant metrics: Words, Characters (with and without spaces), Sentences, Paragraphs",
      "Accurate estimated Reading Time and Speaking Time based on standard WPM rates",
      "Case transformation quick buttons: UPPERCASE, lowercase, Title Case, camelCase",
      "Text cleanup tools: Remove extra spaces, remove blank lines",
      "One-click copy and clear actions",
      "100% private: all text analysis runs locally in your browser",
    ],
    steps: [
      "Type or paste your text into the text area.",
      "View live counters updating instantly above and below.",
      "Use text actions to quickly reformat case or strip excess whitespace.",
      "Copy your polished text with a single click.",
    ],
    faqs: [
      {
        question: "Is my text sent to any server?",
        answer: "No. The word counter runs 100% locally inside your web browser. Your text never leaves your computer.",
      },
      {
        question: "How is reading time calculated?",
        answer: "Reading time is calculated using the standard average reading speed of 200 words per minute (WPM), while speaking time uses 130 WPM.",
      },
    ],
    seoTitle: "Free Online Word Counter & Character Analyzer | MyToolsHut",
    seoDescription: "Count words, characters, sentences, paragraphs, and reading time in real time. Free, 100% private in-browser text tool.",
  },

  // 8. QR Code Generator
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "utilities",
    description: "Generate customizable, high-resolution QR codes for websites, plain text, WiFi, and contact cards.",
    iconName: "QrCode",
    keywords: ["qr code", "qr generator", "create qr code", "custom qr", "wifi qr", "png qr"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Generate QR codes for URLs, Plain Text, WiFi Networks, Emails, and Phone Numbers",
      "Customizable foreground and background colors with real-time preview",
      "High-resolution PNG download and vector SVG export",
      "Adjustable error correction level for maximum readability",
      "100% local client-side generation",
    ],
    steps: [
      "Choose your data type (URL, Text, WiFi, Email).",
      "Enter your content or network credentials.",
      "Pick your preferred QR foreground and background colors.",
      "Click 'Download PNG' to save your customized QR code.",
    ],
    faqs: [
      {
        question: "Do MyToolsHut QR codes ever expire?",
        answer: "No. The QR codes generated are static barcodes containing your encoded data directly. They will work permanently.",
      },
      {
        question: "Is there any scan limit on generated QR codes?",
        answer: "No. Because they are static QR codes, you can scan them an unlimited number of times.",
      },
    ],
    seoTitle: "Free QR Code Generator — Custom Colors & High Res | MyToolsHut",
    seoDescription: "Create free custom QR codes for URLs, text, WiFi, and contacts. Customize colors, download high-resolution PNG or SVG instantly.",
  },

  // 9. Password Generator
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "utilities",
    description: "Generate cryptographically secure, random passwords with customizable length and character sets.",
    iconName: "KeyRound",
    keywords: ["password generator", "strong password", "random password", "secure password", "entropy meter"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Uses Web Crypto API (`crypto.getRandomValues`) for genuine cryptographic security",
      "Configurable password length from 6 to 64 characters",
      "Toggle Uppercase (A-Z), Lowercase (a-z), Numbers (0-9), and Special Symbols (!@#$%^&*)",
      "Exclude ambiguous characters (like 1, l, I, 0, O) to prevent typing errors",
      "Live password strength meter and entropy calculation",
      "One-click copy with instant confirmation toast",
    ],
    steps: [
      "Adjust the password length slider to your desired size (16+ recommended).",
      "Select which character types you want to include.",
      "Click 'Generate New Password'.",
      "Click 'Copy' to copy the secure password to your clipboard.",
    ],
    faqs: [
      {
        question: "Are generated passwords saved or stored anywhere?",
        answer: "Never. Passwords are generated directly on your device using your browser's Web Cryptography API. They are never transmitted or logged.",
      },
      {
        question: "What makes a strong password?",
        answer: "A strong password contains at least 16 characters with a combination of uppercase letters, lowercase letters, numbers, and special symbols.",
      },
    ],
    seoTitle: "Secure Password Generator — Strong & Random | MyToolsHut",
    seoDescription: "Generate cryptographically secure, random passwords online for free. Customizable length, symbols, and live strength meter. 100% private.",
  },

  // 10. JSON Formatter & Validator
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "developer",
    description: "Format, beautify, validate, and minify JSON with syntax highlighting and clear error reporting.",
    iconName: "Braces",
    keywords: ["json formatter", "json validator", "beautify json", "minify json", "json parser", "developer tool"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Beautify and format messy JSON with 2-space or 4-space indentation",
      "Instant syntax validation with exact error position and line number feedback",
      "Minify JSON into a compact single line for production payloads",
      "One-click copy formatted output or clear editor",
      "100% private browser-side parsing",
    ],
    steps: [
      "Paste your raw or minified JSON into the editor.",
      "Click 'Beautify' to format with indentation, or 'Minify' to compress.",
      "If there is a syntax error, inspect the highlighted issue message.",
      "Click 'Copy' to use the cleaned JSON in your project.",
    ],
    faqs: [
      {
        question: "Does this expose my sensitive JSON payloads?",
        answer: "No. All formatting and validation happens locally in JavaScript in your browser. Nothing is sent to any external server.",
      },
    ],
    seoTitle: "Free JSON Formatter & Validator Online | MyToolsHut",
    seoDescription: "Format, validate, beautify, and minify JSON online for free. Real-time syntax error locator and 100% client-side privacy.",
  },

  // 11. Base64 Converter
  {
    slug: "base64-converter",
    name: "Base64 Encoder & Decoder",
    category: "developer",
    description: "Encode text into Base64 or decode Base64 strings with UTF-8 support directly in your browser.",
    iconName: "Binary",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "decode base64", "encode string"],
    popular: false,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Bi-directional encoding and decoding modes",
      "Full UTF-8 support for international characters and emojis",
      "Live conversion as you type",
      "One-click copy and swap inputs",
    ],
    steps: [
      "Select 'Encode' or 'Decode' mode.",
      "Type or paste your input into the source box.",
      "View the converted output updated in real time.",
      "Click 'Copy' to clipboard.",
    ],
    faqs: [
      {
        question: "Does this support UTF-8 special characters?",
        answer: "Yes, our implementation handles Unicode and UTF-8 characters properly so accented letters and symbols will not get garbled.",
      },
    ],
    seoTitle: "Base64 Encoder and Decoder Online | MyToolsHut",
    seoDescription: "Encode text to Base64 and decode Base64 strings online for free. Full UTF-8 support and 100% client-side processing.",
  },

  // 12. Unit Converter
  {
    slug: "unit-converter",
    name: "Unit & Measurement Converter",
    category: "converters",
    description: "Convert length, weight, temperature, and digital storage units accurately in real time.",
    iconName: "Scale",
    keywords: ["unit converter", "length converter", "weight converter", "celsius to fahrenheit", "km to miles", "bytes converter"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Length: Meters, Kilometers, Centimeters, Millimeters, Miles, Yards, Feet, Inches",
      "Weight: Kilograms, Grams, Milligrams, Pounds, Ounces, Metric Tons",
      "Temperature: Celsius, Fahrenheit, Kelvin",
      "Digital Storage: Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes",
      "Instant dual-direction conversion as you type",
    ],
    steps: [
      "Select the category of measurement (Length, Weight, Temperature, or Storage).",
      "Enter the numeric value to convert.",
      "Select the source unit and the target unit.",
      "Read the converted calculation instantly.",
    ],
    faqs: [
      {
        question: "How accurate are the conversion formulas?",
        answer: "Conversions use internationally standardized mathematical conversion factors with high floating-point precision.",
      },
    ],
    seoTitle: "Free Online Unit Converter — Length, Weight & Temp | MyToolsHut",
    seoDescription: "Convert length, weight, temperature, and digital storage units online for free. Fast, accurate, real-time conversion.",
  },

  // 13. Meta Tag Generator
  {
    slug: "meta-tag-generator",
    name: "Meta Tag & Open Graph Generator",
    category: "seo",
    description: "Generate Google SEO, Open Graph, and Twitter Card meta tags with live search and social previews.",
    iconName: "FileCode",
    keywords: ["meta tag generator", "open graph generator", "twitter card generator", "seo tags", "social preview"],
    popular: true,
    isImplemented: true,
    localProcessing: true,
    features: [
      "Generates Standard HTML Meta Tags, Open Graph (Facebook/LinkedIn), and Twitter Cards",
      "Live Google Search snippet preview with character length guidelines",
      "Live Social Media card preview with title, description, and image",
      "Copy formatted HTML code with one click",
      "Client-side execution with no data retention",
    ],
    steps: [
      "Fill in your page title, description, canonical URL, and social share image URL.",
      "Watch the live SERP and social card previews update in real time.",
      "Click 'Copy HTML Tags' and paste into your website's `<head>` section.",
    ],
    faqs: [
      {
        question: "What are the recommended character lengths for SEO meta tags?",
        answer: "Aim for 50–60 characters for your page title and 140–160 characters for your meta description so they do not get truncated in search results.",
      },
    ],
    seoTitle: "Free Meta Tag & Open Graph Generator | MyToolsHut",
    seoDescription: "Generate standard SEO meta tags, Open Graph tags, and Twitter Cards online for free with live SERP preview.",
  },
];

// Helper Functions
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categoryKey: ToolCategoryKey): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === categoryKey);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.popular);
}

export function searchTools(query: string): ToolDefinition[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
      CATEGORIES[tool.category].name.toLowerCase().includes(q)
    );
  });
}

export function getRelatedTools(currentTool: ToolDefinition, limit = 4): ToolDefinition[] {
  return TOOLS.filter((t) => t.slug !== currentTool.slug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === currentTool.category && b.category !== currentTool.category) return -1;
      if (b.category === currentTool.category && a.category !== currentTool.category) return 1;
      // Then shared keywords
      const aShared = a.keywords.filter((k) => currentTool.keywords.includes(k)).length;
      const bShared = b.keywords.filter((k) => currentTool.keywords.includes(k)).length;
      return bShared - aShared;
    })
    .slice(0, limit);
}

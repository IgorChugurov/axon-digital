const variants = {
  green: "bg-green text-background hover:bg-[#2d5228]",
  orange: "bg-orange text-background hover:bg-[#d45805]",
  outline: "border border-green bg-transparent text-green hover:bg-green/10",
  inverse: "bg-background text-ink hover:bg-cream",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClassName(variant: ButtonVariant, extra = "") {
  return [
    "inline-flex h-12 min-w-[152px] items-center justify-center gap-2 px-5 text-[15px] font-medium transition-colors",
    variants[variant],
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({
    children,
    type = "submit",
    onClick,
    variant = "primary",
    width,
}) {
    const base = "py-2 px-4 rounded transition cursor-pointer";
    const applyWidth = width ? width : "w-auto";

    const styles = {
      primary: "bg-[var(--color-primary)] text-white hover:opacity-90",
      secondary: "bg-[var(--color-secondary)] text-white hover:opacity-90",
      danger: "bg-[var(--color-danger)] text-white hover:opacity-90",
      success: "bg-[var(--color-success)] text-white hover:opacity-90",
      auth: "bg-white/10 text-gray-300 hover:bg-gray-500 border border-gray-300 rounded-4xl flex items-center justify-center gap-2",
      gradient:
        "bg-gradient-to-r from-blue-500 to-green-400 text-sm text-white hover:from-green-700 hover:to-green-500 h-10",
    };

    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${applyWidth} ${styles[variant]}`}
      >
        {children}
      </button>
    );
}

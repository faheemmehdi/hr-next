export function ChartCard({ title, children, className = "" }) {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 flex flex-col h-96 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );
}
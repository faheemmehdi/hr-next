export default function Modal({ children, width }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
            
            <div className=" min-h-auto flex justify-center px-4 py-10">
                
                <div
                    className={`
                        bg-white rounded-xl shadow-xl
                        w-full
                        ${width ? width : 'md:w-5/12'}
                    `}
                >
                    <div className="p-6">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}

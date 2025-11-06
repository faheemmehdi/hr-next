export default function Modal({ children, width }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className={`bg-white rounded-lg shadow-lg p-6 ${width ? width : 'w-10/12 md:w-5/12'}`}>

                <div className="w-full">
                    <div className="px-3 py-1 bg-white rounded-xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
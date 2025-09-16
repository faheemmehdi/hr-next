import Image from "next/image";
function AuthLayout({ children, title = false, desc = false }) {
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundImage: "var(--auth-pages-bg-color)" }}
    >
      <div className="w-full p-4 md:p-6 absolute">
        <Image
          src="/images/logo.webp"
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full p-4 pt-20 md:pt-0">
        {/* Left side */}
        <div className="w-full md:w-6/12">
          {/* Title + Description */}
          <div className="w-full mb-6 px-3 md:px-20">
            {title && (
              <>
                <h2 className="text-sm md:text-2xl lg:text-3xl   text-white mb-2">
                  {title}
                </h2>
                {desc && (
                  <p className="text-xs md:text-sm mt-1 md:mt-5 w-full md:w-11/12 text-gray-200">
                    {desc}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <div className=" w-full md:w-6/12 flex items-center justify-center md:mt-3 md:justify-end pr-0 md:pr-22">
          {/* White box with form */}
          <div className="md:w-11/12 lg:w-9/12 w-full auth-card-bg-color md:p-2 p-4 lg:p-5 rounded-xl border border-gray-600 shadow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

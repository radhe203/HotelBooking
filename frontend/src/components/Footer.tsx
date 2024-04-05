
function Footer() {
  return (
    <div className=" bg-blue-900 py-10">
    <div className="flex justify-between mx-auto w-[90vw] md:max-w-[70vw] flex-wrap">
      <span className=" font-bold text-white tracking-tighter text-2xl sm:text-3xl">
        Hotelbooking.com
      </span>
      <span className="flex gap-4 font-bold tracking-tight text-white">
       <p className=' cursor-pointer'>Privacy Policy</p>
       <p className=' cursor-pointer'>Terms of Service</p>
      </span>
    </div>
  </div>
  )
}

export default Footer
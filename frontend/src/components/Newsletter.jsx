const Newsletter = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
        <p className="text-gray-400 mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure sapiente commodi libero!
        </p>
        <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-400 pl-3">
            <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 outline-none" required/>
            <button type="submit" onClick={onSubmitHandler} className="bg-black text-white text-sm font-medium px-10 py-4 cursor-pointer">SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletter
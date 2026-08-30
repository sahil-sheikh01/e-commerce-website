import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-20 text-sm">
            <div>
                <img src={assets.logo} className="w-32 mb-5" alt="" />
                <p className="w-full md:w-2/3 text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sequi, cupiditate eos nemo rerum expedita repellat, exercitationem commodi molestias rem vel voluptatibus delectus? Unde optio reprehenderit impedit amet, quae architecto!
                </p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+1-123-456-7890</li>
                    <li>contact@forever.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr className="text-gray-400" />
            <p className="py-5 text-sm text-center">Copyright 2026 @ forever.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
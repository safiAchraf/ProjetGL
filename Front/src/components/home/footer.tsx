/* Icons */
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";

const Footer = () => {
  return (
    <footer
      className="w-10/12 border-t border-gray-200 py-20 mx-auto"
      id="Contacts"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-5 gap-4"
        data-aos="zoom-in-up"
      >
        <div className="sm:col-start-2 sm:col-span-1 mb-6 sm:mb-0">
          <h2 className="font-medium text-2xl mb-2">Contacts</h2>
          <p className="mb-1">(69) 054-5870</p>
          <p className="mb-3">dzbeauty@estin.dz</p>
          <div className="flex space-x-3">
            <FaInstagram className="text-2xl cursor-pointer" />
            <RiFacebookBoxLine className="text-2xl cursor-pointer" />
            <TbBrandTiktok className="text-2xl cursor-pointer" />
          </div>
        </div>

        <div className="sm:col-start-4 sm:col-span-1">
          <h2 className="font-medium text-2xl mb-2">Address</h2>
          <p>Springfield, 62704</p>
          <p>123 Maple Street</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

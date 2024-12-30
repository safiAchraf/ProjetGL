/* Components */
import { Link } from "react-scroll";

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ServiceTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: Props) => {
  return (
    <div className="relative mb-4">
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {categories.map((category, index) => (
            <Link
              spy={true}
              smooth={true}
              key={index}
              to={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceTabs;

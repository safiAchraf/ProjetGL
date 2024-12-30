/* Hooks */
import { useState } from "react";

/* Types */
import type { Service } from "../../types/data";

/* Icons */
import { Check } from "lucide-react";

interface Props {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

const ServiceCard = ({ service, isSelected, onSelect }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      onSelect(service);
    }
  };

  const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`p-4 border rounded-lg mb-4 transition-all cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:shadow"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow pr-4">
          <h3 className="flex gap-1 font-medium text-lg">
            {service.name}
            {service.inHouse === true && (
              <span className="self-end text-xs text-green-700 pb-1 pl-3">
                (Service Available at Home)
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">{service.duration} mins</p>
          <p
            className={`text-sm mt-2 text-gray-700 ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {service.description}
          </p>
          {service.description.length > 100 && (
            <button
              className="text-blue-500 text-sm mt-1"
              onClick={handleExpandClick}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-500 mb-1">from ${service.price}</p>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isSelected
                ? "bg-blue-500 text-white"
                : "border border-gray-300 text-transparent"
            }`}
          >
            <Check size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

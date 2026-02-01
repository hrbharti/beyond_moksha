interface IProps {
  searchString: string;
  handleSearchChange: (val: string) => void;
}

export default function SideSearch({
  searchString,
  handleSearchChange,
}: IProps) {
  return (
    <div className="w-full flex items-center relative">
      <input
        type="text"
        placeholder="Browse.."
        value={searchString}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full pl-6 pr-24 py-3 border border-gray-200 shadow-inner outline-none bg-white rounded-full text-gray-600"
      />
      <button
        type="submit"
        className="absolute right-0 h-full bg-[#1F3A52] hover:bg-[#1867AE] text-white px-8 rounded-full cursor-pointer transition-colors duration-300"
      >
        Search
      </button>
    </div>
  );
}

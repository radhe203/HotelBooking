export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ page, pages, onPageChange }: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`px-2 py-1 ${
                page === number ? "bg-blue-800 text-white" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;

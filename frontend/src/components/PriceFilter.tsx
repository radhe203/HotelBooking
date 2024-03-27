type Props = {
  selectedPrice?: number;
  onChange: (value: number|undefined) => void;
};

function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div>
      <h4 className=" text-md font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPrice}
        className="border border-gray-300 rounded-md px-3 py-3 bg-transparent w-full"
        onChange={(event) => {
          onChange(
            event.target.value ? parseInt(event.target.value):undefined
          );
        }}
      >
        <option value="">Select Max Price</option>
        {[5000,10000,15000,20000,25000,30000,35000,40000].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PriceFilter;

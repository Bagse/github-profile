function InfoCard({ name, information }) {
  return (
    <div className="flex gap-3 bg-[#111729] px-4 rounded-lg h-12 place-items-center shadow-md">
      <span className="text-[#4A5567] font-semibold">{name} </span>
      <span className="border-r border-[#364153] h-7 border-[1px]"></span>
      <span className="text-sm font-medium">{information}</span>
    </div>
  );
}

export default InfoCard;

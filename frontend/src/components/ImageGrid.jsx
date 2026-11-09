const ImageGrid = ({ images }) => {
  if (!images || images.length === 0) return null;

  // กรณีมีแค่ 1 รูป แสดงภาพเดี่ยวเต็มความกว้าง
  if (images.length === 1) {
    return (
      <div className="my-6 rounded-2xl overflow-hidden border border-theme-border shadow-xs">
        <img 
          src={images[0]} 
          alt="post-0" 
          className="w-full max-h-[480px] object-cover" 
        />
      </div>
    );
  }

  // กรณีมีหลายรูป แสดงเรียงแถวเดียวแนวนอน (Horizontal Scroll Slider)
  return (
    <div className="my-6 space-y-2">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 scrollbar-thin scrollbar-thumb-amber-200">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="snap-start shrink-0 w-[82%] sm:w-[68%] aspect-[4/3] rounded-2xl overflow-hidden border border-theme-border bg-gray-50 shadow-xs"
          >
            <img 
              src={img} 
              alt={`slide-${idx}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>

      {/* ตัวบอกสถานะการเลื่อนดูรูปภาพ */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[11px] text-theme-text-muted">
          รูปภาพประกอบ ({images.length} รูป)
        </span>
      </div>
    </div>
  );
};

export default ImageGrid;
interface CloseIconProps {
  className?: string;
}

export const CloseIcon = ({ className }: CloseIconProps) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-10 h-10 p-1 mx-auto cursor-pointer hover:bg-neutral-700 hover:text-white transition-colors duration-200 rounded-full ${
      className || ""
    }`}
    fill="currentColor"
    viewBox="0 0 1024 1024"
  >
    <path
      id="path"
      d=" M 300 287C 303 287 306 289 309 291C 309 291 500 482 500 482C 500 482 691 291 691 291C 693 289 697 287 700 287C 705 287 710 290 712 295C 714 300 713 305 709 309C 709 309 518 500 518 500C 518 500 709 691 709 691C 712 694 713 699 712 703C 711 708 708 711 703 712C 699 713 694 712 691 709C 691 709 500 518 500 518C 500 518 309 709 309 709C 306 712 301 713 297 712C 292 711 289 708 288 703C 287 699 288 694 291 691C 291 691 482 500 482 500C 482 500 291 309 291 309C 288 305 286 300 288 295C 290 290 295 287 300 287C 300 287 300 287 300 287"
      transform=""
    ></path>
  </svg>
);

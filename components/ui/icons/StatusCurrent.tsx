export default function StatusCurrent() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_307_13297)">
        <g clipPath="url(#clip0_307_13297)">
          <rect x="4" y="4" width="32" height="32" rx="5" fill="#2E3757" />
          <rect x="4" y="4" width="32" height="32" rx="12" fill="#42BBFF" />
          <circle cx="20" cy="20" r="4" fill="#1D2032" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_307_13297"
          x="0"
          y="0"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_307_13297"
          />
          <feOffset />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.180392 0 0 0 0 0.215686 0 0 0 0 0.341176 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_307_13297"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_307_13297"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_307_13297">
          <rect x="4" y="4" width="32" height="32" rx="5" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

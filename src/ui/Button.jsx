import { Link } from 'react-router-dom';
function Button({ children, disabled, to, type, className, onClick }) {
  let base =
    'inline-block w-fit rounded-full bg-yellow-400  text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:border-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed';
  if (className) base = className + ' ' + base;
  const style = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-2 py-1 text-xs md:px-4 md:py-2.5',
    round: base + ' px-1 py-1  text-md md:px-3.5 md:py-2',
    secondary:
      'inline-block w-fit rounded-full font-semibold uppercase text-sm tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 focus:border-hidden focus:outline-none focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-stone-300 px-3.5 py-2.5 md:px-5 md:py-3.5',
  };
  if (to) {
    return (
      <Link to={to} className={style.primary}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={style[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

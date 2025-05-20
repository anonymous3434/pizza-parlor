import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to, className }) {
  const navigate = useNavigate(),
    customClassName =
      'text-sm text-blue-500 hover:text-blue-600 hover:underline ' + className;

  if (to === '-1')
    return (
      <button onClick={() => navigate(-1)} className={customClassName}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={customClassName}>
      {children}
    </Link>
  );
}

export default LinkButton;

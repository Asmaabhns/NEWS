import { Link } from 'react-router-dom';
import { useSearch } from './contaextApi/searchContext';  // عدل المسار حسب مكان الملف

const HeaderTwo = ({ links = [] }) => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div
      className="p-3 mb-4 border d-inline-block"
      style={{
        backgroundColor: '#ecece7',
        width: '100%',
        border: '50px #00796b solid',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      <div>
        {links.map((link, index) => (
          <span key={index}>
            <Link
              to={link.href}
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '20px',
                marginRight: '10px',
                fontWeight: 'bold',
              }}
            >
              {link.label}
            </Link>
            {index < links.length - 1 && ' / '}
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="ابحث.fdsfsd.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '5px 10px',
          fontSize: '18px',
          borderRadius: '5px',
          border: '1px solid #00796b',
          minWidth: '200px',
          flexGrow: 1,
          maxWidth: '300px',
        }}
      />
    </div>
  );
};

export default HeaderTwo;

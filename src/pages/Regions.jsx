import { useRegion } from "../components/contaextApi/RegionContext.jsx";

const Region = () => {
  const { region, setRegion } = useRegion();

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "15px" }}>
      <label htmlFor="regionSelect" style={{ marginRight: "5px" }}>المنطقة:</label>
      <select
        id="regionSelect"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        style={{
          padding: "4px 8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "0.9rem",
        }}
      >
        <option value="غزة">غزة</option>
        <option value="مصر">مصر</option>
        <option value="سوريا">سوريا</option>
      </select>
    </div>
  );
};

export default Region;

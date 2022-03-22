const BooleancheckBox = ({ name, formik, label }) => {
  return (
    <div className="formControl">
      <input
        type="checkbox"
        id={name}
        name={name}
        value={true}
        onChange={formik.handleChange}
        checked={formik.values[name]}
        {...formik.getFieldProps(name)}
      />
      <label htmlFor={name}>{label}</label>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default BooleancheckBox;

const InputText = (props) => {
  return (
    <label htmlFor={props.title}>
      <span>{props.content}</span>
      <input
        type="text"
        name={props.title}
        id={props.title}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        maxLength={props.maxlength || null}
      />
    </label>
  );
};

export default InputText;

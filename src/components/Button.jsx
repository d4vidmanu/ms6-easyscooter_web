import PropTypes from 'prop-types';

const Button = (props) => {
    const { text } = props;
    return (
        <>
            <button className="bg-primary px-5 py-2 text-white">{text}</button>
        </>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;

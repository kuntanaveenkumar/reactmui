import PropTypes from 'prop-types';

const propTypes = {
    locationPropTypes: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        is_approved: PropTypes.bool,
        users_id: PropTypes.number,
        addresses_id: PropTypes.number,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        is_active: PropTypes.bool,
        logo_path: PropTypes.string,
        business_id: PropTypes.number
    })
}
export default propTypes;
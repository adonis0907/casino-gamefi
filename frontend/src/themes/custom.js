const Custom = () => ({
    boxShadow: '0 8px 20px rgb(0, 0, 0, 0.06)',
    ActionButton: {
        backgroundColor: '#35373a',
        borderRadius: '1px',
        color: '#fff',
        minWidth: 0,
        width: '38px !important',
        height: '38px !important',
        '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: 0,
            '& svg': {
                fontSize: '12px'
            }
        },
        '&:hover': {
            backgroundColor: '#35373f'
        }
    }
});

export default Custom;
const componentStyleOveride = () => {
  return {
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontWeight: 'bold !important',
            fontFamily: 'Open Sans !important',
            fontSize: '17px !important',
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          display: 'flex',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '16.8px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          alignItems: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          '& svg': {
            width: '16px',
            height: '16px',
            color: '#000',
            opacity: '0.5'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '19.2px',
          letterSpacing: '3px'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          //color: 'rgba(0, 0, 0, 0.5)',
          //fill: 'rgba(0, 0, 0, 0.5)',
        },
        colorSecondary: {
          fill: '#3E8BF5ff',
          opacity: '1 !important'
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.11)'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundColor: '#1c1c1e',
            color: '#fff'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            color: '#fff'
          }
        }
      }
    }
  }
}

export default componentStyleOveride;
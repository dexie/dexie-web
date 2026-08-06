'use client'

import { useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieBannerProps {
  onAcceptAll: () => void
  onAcceptSelected: (preferences: CookiePreferences) => void
  onReject: () => void
}

const CookieBanner = ({ onAcceptAll, onAcceptSelected, onReject }: CookieBannerProps) => {
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  })

  useEffect(() => {
    // Kontrollera om användaren redan har gjort ett val
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setOpen(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setOpen(false)
    onAcceptAll()
  }

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setOpen(false)
    onAcceptSelected(preferences)
  }

  const handleReject = () => {
    const rejectedPrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem('cookie-consent', JSON.stringify(rejectedPrefs))
    setOpen(false)
    onReject()
  }

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return // Nödvändiga cookies kan inte stängas av
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        backgroundColor: 'var(--dexie-surface-deep)',
        color: 'var(--dexie-text)',
        border: '1px solid rgba(222, 226, 230, 0.2)',
        borderBottom: 'none',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.6)',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-in-out',
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ color: 'var(--dexie-bright)', fontWeight: 600 }}
        >
          We use cookies
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: 'var(--dexie-text)', opacity: 0.9 }}
          paragraph
        >
          We use cookies to enhance your experience on our website. 
          Some cookies are necessary for the website to function, while others 
          help us understand how you use the website so we can improve it.
        </Typography>

        <Accordion 
          expanded={showDetails} 
          onChange={() => setShowDetails(!showDetails)}
          sx={{
            backgroundColor: 'rgba(222, 226, 230, 0.08)',
            border: '1px solid rgba(222, 226, 230, 0.15)',
            '&:before': { display: 'none' },
            borderRadius: '8px !important',
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: 'var(--dexie-text)' }} />}
            sx={{ 
              '& .MuiAccordionSummary-content': { 
                margin: '8px 0' 
              } 
            }}
          >
            <Typography 
              variant="body2" 
              fontWeight="medium"
              sx={{ color: 'var(--dexie-bright)' }}
            >
              Cookie Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.necessary}
                    disabled
                  />
                }
                label={
                  <Box>
                    <Typography 
                      variant="body2" 
                      fontWeight="medium"
                      sx={{ color: 'var(--dexie-bright)' }}
                    >
                      Necessary cookies
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ color: 'var(--dexie-text)', opacity: 0.8 }}
                    >
                      These cookies are necessary for the website to function and cannot be disabled.
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                  />
                }
                label={
                  <Box>
                    <Typography 
                      variant="body2" 
                      fontWeight="medium"
                      sx={{ color: 'var(--dexie-bright)' }}
                    >
                      Analytics cookies (Google Analytics)
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ color: 'var(--dexie-text)', opacity: 0.8 }}
                    >
                      Help us understand how visitors interact with the website by collecting information anonymously.
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange('marketing')}
                  />
                }
                label={
                  <Box>
                    <Typography 
                      variant="body2" 
                      fontWeight="medium"
                      sx={{ color: 'var(--dexie-bright)' }}
                    >
                      Marketing cookies
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ color: 'var(--dexie-text)', opacity: 0.8 }}
                    >
                      Used to deliver relevant advertising and track ad campaigns.
                    </Typography>
                  </Box>
                }
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Container>

      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 1, 
          px: { xs: 2, sm: 3 },
          py: 2,
          borderTop: '1px solid rgba(222, 226, 230, 0.1)'
        }}
      >
        <Button 
          onClick={handleReject} 
          size="small"
          sx={{ 
            color: 'var(--dexie-text)',
            borderColor: 'rgba(222, 226, 230, 0.3)',
            '&:hover': { 
              borderColor: 'var(--dexie-text)',
              backgroundColor: 'rgba(222, 226, 230, 0.1)'
            },
            minWidth: { xs: '100%', sm: 'auto' }
          }}
        >
          Reject All
        </Button>
        <Button 
          onClick={handleAcceptSelected} 
          variant="outlined" 
          size="small"
          sx={{
            color: 'var(--dexie-text)',
            borderColor: 'rgba(222, 226, 230, 0.5)',
            '&:hover': {
              borderColor: 'var(--dexie-text)',
              backgroundColor: 'rgba(222, 226, 230, 0.1)'
            },
            minWidth: { xs: '100%', sm: 'auto' }
          }}
        >
          Save Choices
        </Button>
        <Button 
          onClick={handleAcceptAll} 
          variant="contained" 
          size="small"
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            },
            minWidth: { xs: '100%', sm: 'auto' }
          }}
        >
          Accept All
        </Button>
      </Box>
    </Box>
  )
}

export default CookieBanner

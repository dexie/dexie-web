'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Divider,
} from '@mui/material'
import { 
  getCookiePreferences, 
  setCookiePreferences, 
  clearAnalyticsCookies 
} from '../utils/cookieUtils'

interface CookieSettingsProps {
  open: boolean
  onClose: () => void
  onSave?: () => void
}

const CookieSettings = ({ open, onClose, onSave }: CookieSettingsProps) => {
  const [preferences, setPreferences] = useState(() => {
    const current = getCookiePreferences()
    return current || {
      necessary: true,
      analytics: false,
      marketing: false,
    }
  })

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return // Nödvändiga cookies kan inte stängas av
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleSave = () => {
    const currentPrefs = getCookiePreferences()
    const wasAnalyticsEnabled = currentPrefs?.analytics || false
    
    setCookiePreferences(preferences)
    
    // Om analytics stängs av, rensa cookies
    if (wasAnalyticsEnabled && !preferences.analytics) {
      clearAnalyticsCookies()
    }
    
    // Om analytics aktiveras, ladda om sidan för att aktivera GA
    if (!wasAnalyticsEnabled && preferences.analytics) {
      window.location.reload()
    }
    
    onSave?.()
    onClose()
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'var(--dexie-surface-deep)',
          color: 'var(--dexie-text)',
          border: '1px solid rgba(222, 226, 230, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ color: 'var(--dexie-bright)' }}>Cookie Settings</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" paragraph>
          Manage your cookie preferences below. Some cookies are necessary for the website 
          to function properly and cannot be disabled.
        </Typography>

        <Box mt={2}>
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
                  <Typography variant="body2" fontWeight="medium">
                    Necessary cookies
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    These cookies are necessary for the website to function properly.
                    They cannot be disabled in our systems.
                  </Typography>
                </Box>
              }
            />
            
            <Divider sx={{ my: 1 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange('analytics')}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Analytics cookies (Google Analytics)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Help us understand how visitors use the website by 
                    collecting information anonymously. Includes Google Analytics.
                  </Typography>
                </Box>
              }
            />
            
            <Divider sx={{ my: 1 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.marketing}
                  onChange={() => handlePreferenceChange('marketing')}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Marketing cookies
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Used to deliver relevant advertising and track ad campaigns.
                  </Typography>
                </Box>
              }
            />
          </FormGroup>
        </Box>

        <Box mt={3} p={2} sx={{ backgroundColor: 'rgba(222, 226, 230, 0.05)' }} borderRadius={1}>
          <Typography variant="caption" color="text.secondary">
            <strong>Important:</strong> If you change analytics cookies, a page reload 
            may be required for the changes to take effect.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'var(--dexie-text)' }}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CookieSettings
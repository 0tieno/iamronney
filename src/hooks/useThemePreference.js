import { useEffect, useState } from 'react'
import { normalizeTheme, resolveTheme } from '../app/config'

export function useThemePreference() {
    const [themePreference, setThemePreference] = useState('light')
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const storedTheme = normalizeTheme(window.localStorage.getItem('iamronney_theme'))

        if (storedTheme) {
            setThemePreference(storedTheme)
            window.localStorage.setItem('iamronney_theme', storedTheme)
        } else {
            setThemePreference('light')
        }

        function handleSystemThemeChange(event) {
            setTheme((currentTheme) => {
                if (themePreference !== 'system') {
                    return currentTheme
                }

                return resolveTheme('system', event.matches)
            })
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [themePreference])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const resolvedTheme = resolveTheme(themePreference, mediaQuery.matches)
        setTheme(resolvedTheme)
        document.documentElement.setAttribute('data-theme', resolvedTheme)
    }, [themePreference])

    function handleThemeChange(event) {
        const nextPreference = event.target.value
        setThemePreference(nextPreference)
        window.localStorage.setItem('iamronney_theme', nextPreference)
    }

    return {
        theme,
        themePreference,
        handleThemeChange,
    }
}

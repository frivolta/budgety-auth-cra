import React from 'react'
import styled from 'styled-components'
import Theme from '../../styles/Theme'
import { device } from '../../styles/config'
// Icons
import addIcon from '../../assets/images/icons/add.svg'
import expensesIcon from '../../assets/images/icons/expenses.svg'
import userIcon from '../../assets/images/icons/user.svg'
import reportIcon from '../../assets/images/icons/report.svg'
import Icon from '../../components/Icon/Icon'

import Header from '../../components/Header/Header'

import { useHistory } from 'react-router-dom'

interface DashboardSidenavContainerProps {
  isActive: boolean
}

export interface DashboardProps {
  title: string
  children: React.ReactNode
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: ${(props) => props.theme.misc.headerHeight} 1fr 50px;
  grid-template-areas: 'header header' 'sidenav main' 'sidenav footer';
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  @media ${device.tabletMax} {
    grid-template-columns: 1fr;
    min-height: 100vh;
    height: auto;
    grid-template-areas: 'header' 'main' 'footer';
  }
`
export const DashboardMainContainer = styled.div`
  grid-area: main;
  background-color: ${(props) => props.theme.colors.lightSecondary};
  padding: 0 36px;
`

export const DashboardHeaderContainer = styled.div`
  display: flex;
  grid-area: header;
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
  @media ${device.tabletMax} {
    position: fixed;
    width: 100%;
    height: 72px;
    padding: 0 32px;
    background: ${(props) => props.theme.colors.lightSecondary};
    box-shadow: none;
  }
`
export const DashboardMobileNavigation = styled.div`
  grid-area: footer;
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: none;
  padding: 0 36px;
  @media ${device.tabletMax} {
    background: ${(props) => props.theme.colors.lightPrimary};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: 2;
    display: flex;
    position: fixed;
    width: 100%;
    height: 72px;
    bottom: 0;
  }
`

export const DashboardFooterContainer = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  background-color: $lightSecondary;
  @media ${device.tabletMax} {
    height: 72px;
  }
`

export const DashboardSidenavContainer = styled.div<
  DashboardSidenavContainerProps
>`
  grid-area: sidenav;
  padding-top: ${(props) => props.theme.misc.headerHeight};
  transition: all 0.4s ease-in-out;
  background: ${(props) => props.theme.colors.lightPrimary};
  display: flex;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.05);

  @media ${device.tabletMax} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    max-width: 100%;
    bottom: 0;
    transform: ${(props) =>
      props.isActive ? `transform: translate(0, 0);` : `translate(-100%, 0)`};
  }
`

export const DashboardSidenavTitle = styled.div`
  margin-top: 3rem;
  margin-bottom: 16px;
  margin-left: 32px;
  margin-right: 32px;
`

export const DashboardSidenavHr = styled.hr`
  border-top: 1px solid ${(props) => props.theme.colors.darkSecondary};
  margin-left: 32px;
  margin-right: 32px;
`

// @Test
// - Title is present
// - Links are working
// - Page is settings, icon is disabled

const GridLayout: React.FC<DashboardProps> = (props) => {
  const [isSettingsPage, setIsSettingsPage] = React.useState(false)
  let history = useHistory()

  // Dashboard links
  const linkAddresses = {
    dashboard: '/dashboard',
    settings: '/settings',
    addExpense: '/add-expense',
    report: '/report',
  }
  React.useEffect(() => {
    // Disable settings button link if page is already settings
    history.location.pathname === linkAddresses.settings
      ? setIsSettingsPage(true)
      : setIsSettingsPage(false)
  }, [history, linkAddresses.settings])

  // Redirect to page
  const redirectToPage = (link: string): void => {
    history.push(link)
  }

  return (
    <Theme>
      <Grid>
        <DashboardHeaderContainer>
          <Header title={props.title} />
          <Icon
            icon={userIcon}
            onClick={() => redirectToPage(linkAddresses.settings)}
            alt="Settings"
            shadow
            disabled={isSettingsPage}
          />
        </DashboardHeaderContainer>
        <DashboardSidenavContainer isActive={false} />
        <DashboardMainContainer>{props.children}</DashboardMainContainer>
        <DashboardMobileNavigation>
          <Icon
            onClick={() => redirectToPage(linkAddresses.dashboard)}
            icon={expensesIcon}
            alt="report"
            inverted
          />
          <Icon
            onClick={() => redirectToPage(linkAddresses.addExpense)}
            icon={addIcon}
            alt="add expense"
            shadow
          />
          <Icon
            onClick={() => redirectToPage(linkAddresses.report)}
            icon={reportIcon}
            alt="expenses"
            inverted
          />
        </DashboardMobileNavigation>
      </Grid>
    </Theme>
  )
}

export default GridLayout

import { ReactNode } from "react"
import OverviewIcon from "../_assets/OverviewIcon"
import CalenderIcon from "../_assets/CalenderIcon"
import ListIcon from "../_assets/ListIcon"
import PersonIcon from "../_assets/PersonIcon"
import ServicesIcon from "../_assets/ServicesIcon"
import DollarIcon from "../_assets/DollarIcon"
import SpannerIcon from "../_assets/SpannerIcon"

export class NavLink {
  name: string
  href: string
  icon: ReactNode

  constructor(name: string, href: string, icon: ReactNode) {
    this.name = name
    this.href = href
    this.icon = icon
  }
}

export const serviceVendorNavLinks = [
  new NavLink("Overview", "/vendor", <OverviewIcon />),
  new NavLink("Appointments", "/vendor/appointments", <CalenderIcon />),
  new NavLink("Services", "/vendor/services", <ServicesIcon />),
  new NavLink("Price list", "/vendor/price-list", <ListIcon />),
  new NavLink("Profile", "/vendor/profile", <PersonIcon />),
  new NavLink("Accounts", "/vendor/accounts", <DollarIcon />),
  new NavLink("Settings", "/vendor/settings", <SpannerIcon />),
]
export const clientNavLinks = [
  new NavLink("Overview", "/client", <OverviewIcon />),
  new NavLink("Appointments", "/client/appointments", <CalenderIcon />),
  // new NavLink("Services", "/client/services", <ServicesIcon />),
  // new NavLink("Price list", "/client/price-list", <ListIcon />),
  new NavLink("Profile", "/client/profile", <PersonIcon />),
  new NavLink("Accounts", "/client/accounts", <DollarIcon />),
  new NavLink("Settings", "/client/settings", <SpannerIcon />),
]


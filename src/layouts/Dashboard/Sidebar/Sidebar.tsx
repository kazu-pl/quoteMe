import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { StyledDivider, StyledSidebarWrapper } from "./Sidebar.styled";
import Link from "next/link";

const { SubMenu } = Menu;

interface SidebarMenuItemWithoutDropdown {
  variant: "no-dropdown";
  icon: React.ReactNode;
  label: string;
  to: string;
  renderBottomLine?: boolean;
}

interface SidebarMenuItemWithDropdown {
  variant: "with-dropdown";
  icon: React.ReactNode;
  label: string;
  renderBottomLine?: boolean;
  dropdownItems: {
    to: string;
    label: string;
  }[];
}

type SidebarItemProps =
  | SidebarMenuItemWithoutDropdown
  | SidebarMenuItemWithDropdown;

interface DefaultOpenItems {
  defaultSelectedKeys: string[];
  defaultOpenKeys: string[];
}

export interface SidebarProps {
  width?: number | string;
  items: SidebarItemProps[];
}

const Sidebar = ({ width = 256, items }: SidebarProps) => {
  const router = useRouter();

  const defaultOpen: DefaultOpenItems = items.reduce(
    (prev, next: SidebarItemProps) => {
      let newSelectedKey;
      let newOpenKey;

      if (next.variant === "no-dropdown") {
        if (router.asPath === next.to) {
          newSelectedKey = next.label;
        }
      } else {
        const activeSubItem = next.dropdownItems.find(
          (item) => router.asPath === item.to
        )?.label;

        if (activeSubItem) {
          newOpenKey = next.label;
          newSelectedKey = `${next.label}-${activeSubItem}`;
        }
      }

      return {
        ...prev,
        defaultSelectedKeys: !!newSelectedKey
          ? prev.defaultSelectedKeys.concat(newSelectedKey)
          : prev.defaultSelectedKeys,
        defaultOpenKeys: !!newOpenKey
          ? prev.defaultOpenKeys.concat(newOpenKey)
          : prev.defaultOpenKeys,
      };
    },
    {
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
    } as DefaultOpenItems
  );

  return (
    <StyledSidebarWrapper width={width}>
      <Menu
        defaultSelectedKeys={defaultOpen.defaultSelectedKeys}
        defaultOpenKeys={defaultOpen.defaultOpenKeys}
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        style={{
          height: `100%`,
          width: `100%`,
        }}
      >
        {items.map((item, index) => {
          return item.variant === "no-dropdown" ? (
            <React.Fragment key={index}>
              <Menu.Item key={item.label} icon={item.icon}>
                <Link href={item.to}>
                  <a>{item.label}</a>
                </Link>
              </Menu.Item>
              {item.renderBottomLine && <StyledDivider />}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              <SubMenu key={item.label} icon={item.icon} title={item.label}>
                {item.dropdownItems.map((subItem) => (
                  <Menu.Item key={`${item.label}-${subItem.label}`}>
                    <Link href={subItem.to}>
                      <a>{subItem.label}</a>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
              {item.renderBottomLine && <StyledDivider />}
            </React.Fragment>
          );
        })}
      </Menu>
    </StyledSidebarWrapper>
  );
};

export default Sidebar;

const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Dashboard",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: "feather icon-home",
          url: "/dashboard",
        },
      ],
    },
    {
      id: "ui-element",
      title: "My Earnings",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "component",
          title: "Earnings",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "MyInvestment",
              title: "Portfolio",
              type: "item",
              url: "/myInvestment",
            },
            // {
            //   id: "badges",
            //   title: "Monthly Returns",
            //   type: "item",
            //   url: "/basic/badges",
            // },
          ],
        },
      ],
    },

    {
      id: "profile-element",
      title: "User Info",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "profile-menu",
          title: "Profile",
          type: "item",
          url: "/profile",
          classes: "nav-item",
          icon: "feather icon-user",
        },
        {
          id: "disabled-menu",
          title: "Sign Out",
          type: "item",
          url: "/",
          classes: "nav-item disabled",
          icon: "feather icon-power",
        },
      ],
    },
  ],
};

export default menuItems;

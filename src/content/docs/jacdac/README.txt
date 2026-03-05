To work with Jacdac, there are some basic concepts:

- The Jacdac bus (JDBus) is where all Jacdac devices may be found. From the web browser,
  we connect to the physical Jacdac bus via WebUSB. This requires a user request (like
  pushing a button). See ConnectButton.tsx.  The bus may come and go, as the user 
  disconnects the micro:bit from USB. We subscribe to changes to the bus status to reflect
  the current state of the bus. See https://jacdac.github.io/jacdac-docs/clients/javascript/jdom/bus/

- We can enumerate the devices on the bus: see Devices.tsx.  Devices may come and go 
  so we also subscribe to changes on the bus. See https://jacdac.github.io/jacdac-docs/clients/javascript/jdom/device/

- Each device has a list of services that it supports. Each service has a unique id, defined
  in jacdac-ts. For example, the button service's id is SRV_BUTTON. Every device must implement
  the control service: SRV_CONTROL.  https://jacdac.github.io/jacdac-docs/clients/javascript/jdom/service/

- Each service is defined by registers, commands and events.

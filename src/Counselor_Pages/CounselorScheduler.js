import React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  EditRecurrenceMenu,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import Grid from "@mui/material/Grid";
import Room from "@mui/icons-material/Room";
import { styled } from "@mui/material/styles";
import classNames from "clsx";

import { appointments } from "../demo-data/month-appointments";

const PREFIX = "Demo";

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#7DB9B6",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(
  () => ({
    [`&.${classes.firstRoom}`]: {
      background:
        "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
    },
    [`&.${classes.secondRoom}`]: {
      background:
        "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
    },
    [`&.${classes.thirdRoom}`]: {
      background:
        "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
    },
    [`&.${classes.header}`]: {
      height: "260px",
      backgroundSize: "cover",
    },
  })
);

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: "center",
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledAppointmentTooltipCommandButton = styled(
  AppointmentTooltip.CommandButton
)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const getClassByLocation = (location) => {
  if (location === "Room 1") return classes.firstRoom;
  if (location === "Room 2") return classes.secondRoom;
  return classes.thirdRoom;
};

const Header = ({ children, appointmentData, ...restProps }) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    className={classNames(
      getClassByLocation(appointmentData.location),
      classes.header
    )}
    appointmentData={appointmentData}
  />
);

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledRoom className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const CommandButton = ({ ...restProps }) => (
  <StyledAppointmentTooltipCommandButton
    {...restProps}
    className={classes.commandButton}
  />
);

class CounselorScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentViewName: "work-week",
      currentDate: "2018-07-25",
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }
  changeAddedAppointment = (addedAppointment) => {
    this.setState({ addedAppointment });
  };

  changeAppointmentChanges = (appointmentChanges) => {
    this.setState({ appointmentChanges });
  };

  changeEditingAppointment = (editingAppointment) => {
    this.setState({ editingAppointment });
  };

  commitChanges = ({ added, changed, deleted }) => {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  };

  currentViewNameChange = (currentViewName) => {
    this.setState({ currentViewName });
  };

  currentDateChange = (currentDate) => {
    this.setState({ currentDate });
  };

  render() {
    const {
      data,
      currentViewName,
      currentDate,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <div>
        <h1>
          <center>Counselor Scheduler</center>
        </h1>
        <Paper>
          <Scheduler data={data} height={850}>
            <ViewState
              currentDate={currentDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
            />

            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={this.changeEditingAppointment}
            />

            <WeekView startDayHour={10} endDayHour={19} />
            <WeekView
              name="work-week"
              displayName="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <DayView />

            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              headerComponent={Header}
              contentComponent={Content}
              commandButtonComponent={CommandButton}
              showCloseButton
              showOpenButton
            />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}

export default CounselorScheduler;

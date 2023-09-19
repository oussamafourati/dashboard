import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Form,
  Modal,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import Breadcrumb from "Common/BreadCrumb";
import FullCalendar from "@fullcalendar/react";
import allLocales from "@fullcalendar/core/locales-all";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  updateEvent as onUpdateEvent,
  resetCalendar,
} from "../../slices/thunk";
import {
  Notes,
  useAddNewNoteMutation,
  useGetAllNotesQuery,
} from "features/notes/notesSlice";
import Swal from "sweetalert2";
import axios from "axios";
import StockReport from "pages/Dashboard/EnRuptureStock";

const Calendar = () => {
  document.title = "Calendrier | Radhouani";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Calendrier" pageTitle="Calendrier" />
          <StockReport />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Calendar;

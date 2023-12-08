import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, Col, Collapse, Dropdown, Offcanvas, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const RightSidebar = () => {
  
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        preloader,
        bodyImageType
    } = useSelector((state: any) => ({
        layoutType: state.Layout.layoutType,
        leftSidebarType: state.Layout.leftSidebarType,
        layoutModeType: state.Layout.layoutModeType,
        layoutWidthType: state.Layout.layoutWidthType,
        layoutPositionType: state.Layout.layoutPositionType,
        topbarThemeType: state.Layout.topbarThemeType,
        leftsidbarSizeType: state.Layout.leftsidbarSizeType,
        leftSidebarViewType: state.Layout.leftSidebarViewType,
        leftSidebarImageType: state.Layout.leftSidebarImageType,
        preloader: state.Layout.preloader,
        bodyImageType: state.Layout.bodyImageType
    }));

    window.onscroll = function () {
        scrollFunction();
    };

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };
    
    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const pathName = useLocation().pathname;

    useEffect(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.opacity = "1";
            preloader.style.visibility = "visible";
            setTimeout(function () {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 1000);
        }
    }, [preloader, pathName]);


    return (
    
        <React.Fragment>
            <Button variant="info" className="btn-icon" id="back-to-top" onClick={() => toTop()}>
                <i className="ri-arrow-up-line"></i>
            </Button>
        </React.Fragment >
    )
}

export default RightSidebar

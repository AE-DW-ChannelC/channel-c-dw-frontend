import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Card, useAccordionButton } from "react-bootstrap";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

function FAQPage() {
  return (
    <div className="container">
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">තරග විස්තර</h5>
      </div>
      <div
        className="mt-5"
        style={{ overflowY: "hidden", paddingBottom: "120px" }}
      >
        <div>
          <Accordion defaultActiveKey="0">
            <Card className="faq-item-container text-start">
              <Card.Header>
                <CustomToggle eventKey="1">
                දැනුමයි වාසනාවයි යනු කුමක්ද ?
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="my-4 text-white">
              ප්‍රශ්නාවලිය ආරම්භ වන විට සහ පරිශීලකයාගේ පිළිතුරු වාර්තා කරන විට පද්ධතිය තත්පර (10) ටයිමරයක් ආරම්භ කරයි. ටයිමරය අවසන් වුවහොත්, ලකුණු ලබා නොදේ. පද්ධතිය ක්‍රීඩා කරන ප්‍රශ්නාවලිය ගණන සහ පශීලකයා නොලේ ප්‍රශ්නාවලිය (5) සීමාව තුළ සිටීද නැතහොත් අමතර ප්‍රශ්නාවලිය සඳහා ගෙවීමට අවශ්‍යද යන්න නික්ෂණය කරයි.
              </Card.Body>
            </Accordion.Collapse>
            <Card className="faq-item-container text-start mt-3">
              <Card.Header>
                <CustomToggle eventKey="2">
                 සේවාවෙන් ඉවත් වෙන්නේ කෙසේද ?
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Collapse eventKey="2">
              <Card.Body className="my-4 text-white">
              ප්‍රශ්නාවලිය ආරම්භ වන විට සහ පරිශීලකයාගේ පිළිතුරු වාර්තා කරන විට පද්ධතිය තත්පර (10) ටයිමරයක් ආරම්භ කරයි. ටයිමරය අවසන් වුවහොත්, ලකුණු ලබා නොදේ. පද්ධතිය ක්‍රීඩා කරන ප්‍රශ්නාවලිය ගණන සහ පශීලකයා නොලේ ප්‍රශ්නාවලිය (5) සීමාව තුළ සිටීද නැතහොත් අමතර ප්‍රශ්නාවලිය සඳහා ගෙවීමට අවශ්‍යද යන්න නික්ෂණය කරයි.
              </Card.Body>
            </Accordion.Collapse>
            <Card className="faq-item-container text-start mt-3">
              <Card.Header>
                <CustomToggle eventKey="3">ලකුණු ලබාගන්නේ කෙසේද ? </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Collapse eventKey="3">
              <Card.Body className="my-4 text-white">
              ප්‍රශ්නාවලිය ආරම්භ වන විට සහ පරිශීලකයාගේ පිළිතුරු වාර්තා කරන විට පද්ධතිය තත්පර (10) ටයිමරයක් ආරම්භ කරයි. ටයිමරය අවසන් වුවහොත්, ලකුණු ලබා නොදේ. පද්ධතිය ක්‍රීඩා කරන ප්‍රශ්නාවලිය ගණන සහ පශීලකයා නොලේ ප්‍රශ්නාවලිය (5) සීමාව තුළ සිටීද නැතහොත් අමතර ප්‍රශ්නාවලිය සඳහා ගෙවීමට අවශ්‍යද යන්න නික්ෂණය කරයි.
              </Card.Body>
            </Accordion.Collapse>
            <Card className="faq-item-container text-start mt-3">
              <Card.Header>
                <CustomToggle eventKey="4">
                ජයග්‍රාහකයෙකු තෝරාගන්නේ කෙසේද ?
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Collapse eventKey="4">
              <Card.Body className="my-4 text-white">
              ප්‍රශ්නාවලිය ආරම්භ වන විට සහ පරිශීලකයාගේ පිළිතුරු වාර්තා කරන විට පද්ධතිය තත්පර (10) ටයිමරයක් ආරම්භ කරයි. ටයිමරය අවසන් වුවහොත්, ලකුණු ලබා නොදේ. පද්ධතිය ක්‍රීඩා කරන ප්‍රශ්නාවලිය ගණන සහ පශීලකයා නොලේ ප්‍රශ්නාවලිය (5) සීමාව තුළ සිටීද නැතහොත් අමතර ප්‍රශ්නාවලිය සඳහා ගෙවීමට අවශ්‍යද යන්න නික්ෂණය කරයි.
              </Card.Body>
            </Accordion.Collapse>
            <Card className="faq-item-container text-start mt-3">
              <Card.Header>
                <CustomToggle eventKey="4">
                දිනුම් ලබාදෙන්නේ කෙසේද ?
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Collapse eventKey="4">
              <Card.Body className="my-4 text-white">
              ප්‍රශ්නාවලිය ආරම්භ වන විට සහ පරිශීලකයාගේ පිළිතුරු වාර්තා කරන විට පද්ධතිය තත්පර (10) ටයිමරයක් ආරම්භ කරයි. ටයිමරය අවසන් වුවහොත්, ලකුණු ලබා නොදේ. පද්ධතිය ක්‍රීඩා කරන ප්‍රශ්නාවලිය ගණන සහ පශීලකයා නොලේ ප්‍රශ්නාවලිය (5) සීමාව තුළ සිටීද නැතහොත් අමතර ප්‍රශ්නාවලිය සඳහා ගෙවීමට අවශ්‍යද යන්න නික්ෂණය කරයි.
              </Card.Body>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function CustomToggle({ children, eventKey }) {
  const [key, setkey] = useState(eventKey);
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setkey(eventKey);
  });

  return (
    <div
      type="button"
      style={{
        color: "white",
        textAlign: "start",
        width: "100%",
        border: "none",
        fontSize: "20px",
        fontWeight: "bold",
      }}
      className="d-flex justify-content-between"
      onClick={decoratedOnClick}
    >
      <div>{children}</div>{" "}
      <div>
        {key == eventKey ? <IoIosArrowDropdown /> : <IoIosArrowDropup />}
      </div>
    </div>
  );
}

export default FAQPage;

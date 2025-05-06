import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Card, useAccordionButton } from "react-bootstrap";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { GameDetails } from "../services/gameDetails.service";
import Swal from "sweetalert2";
import LoadingFullscreen from "../components/LoadingFullscreen";


function FAQPage() {


  const [loading, setLoading] = useState(false);
  const [gameDetails, setGameDetails] = useState([]);

  const showErrorAlert = (message = "Something went wrong!") => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  const fetchGameDetails = async () => {
    setLoading(true);
    try {
      const response = await GameDetails.getGameDetails();
      setGameDetails(response?.data);
    } catch (error) {
      showErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameDetails();
  }, [])


  return (
    <div className="container">
      <LoadingFullscreen loading={loading} />
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">තරග විස්තර</h5>
      </div>
      <div
        className="mt-5"
        style={{ overflowY: "hidden", paddingBottom: "120px" }}
      >
        <div>
          <Accordion defaultActiveKey="0">
            {gameDetails?.map((gameDetil) => (
              <Accordion.Item
                className="faq-item-container text-start mb-3"
                key={gameDetil.id}
                eventKey={gameDetil.id}
              >
                <Accordion.Header className="custom-accordion-header">
                  {gameDetil?.question}
                </Accordion.Header>
                <Accordion.Body className="my-4 text-white">
                  {gameDetil?.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;

import React, { useState } from "react";
import "/src/assets/style.css";
import Navigation from "../components/Navigation";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
} from "react-bootstrap";

const SettingsPage = () => {
  //inputs for form
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    medicationAlerts: true,
    newsletter: false,
    promotional: false,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "english",
    fontSize: "medium",
  });

  // Handle form submissions
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // Add API call here
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    console.log("Security updated:", security);
    // Add API call here
  };

  return (
    <div className="app-container">
      <Navigation />

      <div className="settings-container ">
        <h2 className="settings-header">Settings</h2>

        <Tabs defaultActiveKey="profile" id="settings-tabs" className="mb-4">
          {/* Profile Tab */}
          <Tab eventKey="profile" title="Profile">
            <Card className="settings-card">
              <Card.Body>
                <Form onSubmit={handleProfileSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile.firstName}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile.lastName}
                          onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile.address}
                          onChange={(e) =>
                            setProfile({ ...profile, address: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="settings-actions">
                    <Button variant="primary" type="submit">
                      {" "}
                      Save Profile{" "}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Tab>

          {/* Security Tab */}
          <Tab eventKey="security" title="Security">
            <Card className="settings-card">
              <Card.Body>
                <Form onSubmit={handleSecuritySubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={security.currentPassword}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={security.newPassword}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <div className="settings-actions">
                    <Button variant="primary" type="submit">
                      Update Password
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
          {/* Notifications Settings Tab */}
          <Tab eventKey="notifications" title="Notifications">
            <Card className="settings-card">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="appointment-reminders"
                      label="Appointment Reminders"
                      checked={notifications.appointmentReminders}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          appointmentReminders: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="medication-alerts"
                      label="Medication Alerts"
                      checked={notifications.medicationAlerts}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          medicationAlerts: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="newsletter"
                      label="Monthly Newsletter"
                      checked={notifications.newsletter}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          newsletter: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="promotional"
                      label="Promotional Offers"
                      checked={notifications.promotional}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          promotional: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <div className="settings-actions">
                    <Button
                      variant="primary"
                      onClick={() =>
                        console.log("Notifications updated:", notifications)
                      }
                    >
                      Save Notification Preferences
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
          {/* Preferences Tab */}
          <Tab eventKey="preferences" title="Preferences">
            <Card className="settings-card">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Theme</Form.Label>
                    <Form.Select
                      value={preferences.theme}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          theme: e.target.value,
                        })
                      }
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Select
                      value={preferences.language}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          language: e.target.value,
                        })
                      }
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Font Size</Form.Label>
                    <Form.Select
                      value={preferences.fontSize}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          fontSize: e.target.value,
                        })
                      }
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="settings-actions">
                    <Button
                      variant="primary"
                      onClick={() =>
                        console.log("Preferences updated:", preferences)
                      }
                    >
                      Save Preferences
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;

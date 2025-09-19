import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

import searchIcon from "../../assets/search.png";
import phase1Icon from "../../assets/truck.png";
import phase2Icon from "../../assets/Group.png";
import phase3Icon from "../../assets/glass.png";

type Row = {
  batchNo: string;
  batchId: string;
  phase: string;
  grade: string;
  co2: number;
  inspector?: string;
};

const tableData: Row[] = [
  { batchNo: "01", batchId: "1EF5ST0", phase: "Phase 1", grade: "D", co2: 12, inspector: "Mr. Sharma" },
  { batchNo: "02", batchId: "5E445T0", phase: "Phase 3", grade: "F", co2: 10, inspector: "Ms. Gupta" },
  { batchNo: "03", batchId: "9E445AQ", phase: "Phase 2", grade: "A", co2: 12, inspector: "Dr. Khan" },
  { batchNo: "04", batchId: "4WDKKK", phase: "Phase 3", grade: "C", co2: 5, inspector: "Mr. Verma" },
  { batchNo: "05", batchId: "5FGDSA", phase: "Phase 1", grade: "B", co2: 5, inspector: "Ms. Patel" },
  { batchNo: "06", batchId: "5E445W", phase: "Phase 3", grade: "A", co2: 10, inspector: "Mr. Singh" },
  { batchNo: "07", batchId: "9E445TA", phase: "Phase 1", grade: "E", co2: 12, inspector: "Dr. Rao" },
  { batchNo: "08", batchId: "5RHFRD", phase: "Phase 2", grade: "D", co2: 5, inspector: "Mr. Kumar" },
  { batchNo: "09", batchId: "5ETDND", phase: "Phase 3", grade: "B", co2: 5, inspector: "Ms. Iyer" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [showSheetsModal, setShowSheetsModal] = useState(false);

  const googleSheetsLinks = [
    { name: "RAw Material CSV_1", link: "https://docs.google.com/spreadsheets/d/10fKIaG8B_8GZmhcslRcpyAIPLXWlxzN3ekSwXLFIw0c/edit?usp=sharing" },
    { name: "Inbound Logistics CSV_2", link: "https://docs.google.com/spreadsheets/d/1G_6PP2J3371EzOrbCD-__NfonU6doS8v4pG74gzdas8/edit?usp=sharing" },
    { name: "On-Site Handling CSV_3", link: "https://docs.google.com/spreadsheets/d/1weB1zX8GWjPqN2OiOurpfNHvg0FGxlGG-A3y2FLbz_A/edit?usp=sharing" },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tableData;
    return tableData.filter(
      (r) =>
        r.batchNo.toLowerCase().includes(q) ||
        r.batchId.toLowerCase().includes(q) ||
        r.phase.toLowerCase().includes(q) ||
        r.grade.toLowerCase().includes(q) ||
        (r.inspector || "").toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const idxLast = currentPage * rowsPerPage;
  const idxFirst = idxLast - rowsPerPage;
  const currentRows = filtered.slice(idxFirst, idxLast);

  const openDetails = (row: Row) => setSelectedRow(row);
  const closeDetails = () => setSelectedRow(null);
  const goToPhase = (phase: string) => navigate(`/upload?phase=${encodeURIComponent(phase)}`);

  return (
    <div className="dashboard">
      <main className="main-wrap">
        <div className="page-inner">
          {/* LEFT COLUMN */}
          <section className="left-col">
            <h2 className="page-title">Dashboard</h2>
            <div className="search-pill">
              <img src={searchIcon} alt="search" className="search-img" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Batch Id"
                className="search-input"
              />
            </div>

            <div className="card table-card">
              <div className="table-wrap">
                <table className="batch-table">
                  <thead>
                    <tr>
                      <th>Serial No</th>
                      <th>Batch ID</th>
                      <th>Current Phase</th>
                      <th>Material Grade</th>
                      <th>Kg CO2e</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="no-results">
                          No results
                        </td>
                      </tr>
                    ) : (
                      currentRows.map((r, i) => (
                        <tr key={r.batchId + i}>
                          <td className="col-number">{r.batchNo}</td>
                          <td className="col-id">{r.batchId}</td>
                          <td className="col-phase">{r.phase}</td>
                          <td className="col-grade">{r.grade}</td>
                          <td className="col-co2">{r.co2}</td>
                          <td className="col-action">
                            <button className="details-btn" onClick={() => openDetails(r)}>
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="card-footer">
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    &lt; Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`page-num ${currentPage === i + 1 ? "active" : ""}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next &gt;
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <aside className="right-col">
            <div className="add-card">
              <div className="add-card-title">Add Data</div>
              <div className="phase-list">
                <div className="phase-row" onClick={() => goToPhase("Phase 1")}>
                  <div className="phase-icon bg-yellow">
                    <img src={phase1Icon} alt="phase1" />
                  </div>
                  <div className="phase-text">
                    <div className="phase-title">Phase 1</div>
                    <div className="phase-sub">Pre Production</div>
                  </div>
                </div>

                <div className="phase-row" onClick={() => goToPhase("Phase 2")}>
                  <div className="phase-icon bg-blue">
                    <img src={phase2Icon} alt="phase2" />
                  </div>
                  <div className="phase-text">
                    <div className="phase-title">Phase 2</div>
                    <div className="phase-sub">Production</div>
                  </div>
                </div>

                <div className="phase-row" onClick={() => goToPhase("Phase 3")}>
                  <div className="phase-icon bg-pink">
                    <img src={phase3Icon} alt="phase3" />
                  </div>
                  <div className="phase-text">
                    <div className="phase-title">Phase 3</div>
                    <div className="phase-sub">Post Producion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Sheets Section */}
            <div className="sheets-card" onClick={() => setShowSheetsModal(true)}>
              <div className="sheets-card-title">See Sample_CSV</div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODALS */}
      {selectedRow && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Batch Details</h3>
            <div className="modal-row">
              <b>Batch ID:</b> {selectedRow.batchId}
            </div>
            <div className="modal-row">
              <b>Material Grade:</b> {selectedRow.grade}
            </div>
            <div className="modal-row">
              <b>Inspector:</b> {selectedRow.inspector}
            </div>
            <div className="modal-row">
              <b>Phase:</b> {selectedRow.phase}
            </div>
            <div className="modal-row">
              <b>Kg CO₂e:</b> {selectedRow.co2}
            </div>
            <div className="modal-actions">
              <button className="close-btn" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showSheetsModal && (
        <div className="modal-overlay" onClick={() => setShowSheetsModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <h3>Sample_CSV</h3>
            <ul className="sheets-list">
              {googleSheetsLinks.map((sheet, idx) => (
                <li key={idx}>
                  <a href={sheet.link} target="_blank" rel="noopener noreferrer">
                    {sheet.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setShowSheetsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

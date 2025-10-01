export const SkeletonLoader = () => (
  <div
    style={{
      maxWidth: "970px",
      width: "100%",
      margin: "2.5rem auto 0",
    }}
  >
    {/* Video testimonials skeleton */}
    <div style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "1.25rem",
          // Responsive: sm:grid-cols-2 lg:grid-cols-3
          // Tailwind responsive not available inline, handle via media queries if needed
        }}
      >
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#1f2937", // bg-gray-800
              borderRadius: "0.5rem",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "1.25rem",
              width: "321.11px",
              height: "575.59px",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          >
            <div
              style={{
                backgroundColor: "#374151", // bg-gray-700
                borderRadius: "0.5rem",
                height: "100%",
                aspectRatio: "16/9",
              }}
            ></div>
            <div style={{ padding: "1rem" }}>
              <div
                style={{
                  height: "1rem",
                  backgroundColor: "#374151",
                  borderRadius: "0.25rem",
                  width: "75%",
                  marginBottom: "0.75rem",
                }}
              ></div>
              <div
                style={{
                  height: "0.75rem",
                  backgroundColor: "#374151",
                  borderRadius: "0.25rem",
                  width: "50%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Text testimonials skeleton */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "1.5rem",
        // md:grid-cols-2 responsive handled via media queries if needed
      }}
    >
      {[...Array(2)].map((_, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: "#1f2937",
            padding: "3.5rem 1.5rem",
            borderRadius: "0.5rem",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                backgroundColor: "#374151",
              }}
            ></div>
            <div>
              <div
                style={{
                  height: "1rem",
                  width: "8rem",
                  backgroundColor: "#374151",
                  borderRadius: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              ></div>
              <div
                style={{
                  height: "0.75rem",
                  width: "6rem",
                  backgroundColor: "#374151",
                  borderRadius: "0.25rem",
                }}
              ></div>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div
              style={{
                height: "0.75rem",
                backgroundColor: "#374151",
                borderRadius: "0.25rem",
                width: "100%",
              }}
            ></div>
            <div
              style={{
                height: "0.75rem",
                backgroundColor: "#374151",
                borderRadius: "0.25rem",
                width: "83.3333%",
              }}
            ></div>
            <div
              style={{
                height: "0.75rem",
                backgroundColor: "#374151",
                borderRadius: "0.25rem",
                width: "66.6667%",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>

    {/* Keyframes for pulse animation */}
    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

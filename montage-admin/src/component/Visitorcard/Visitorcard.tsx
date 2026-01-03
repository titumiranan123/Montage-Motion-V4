import React from 'react';

interface ConnectionData {
  id: string;
  ip: string;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  provider?: string | null;
  device?: string | null;
  os: string;
  browser: string;
  visit_count: number;
  first_visit: string;
  last_visit: string;
  is_duplicate?: boolean | null;
  user_agent?: string | null;
}

interface ConnectionCardProps {
  data: ConnectionData | null | undefined;
}

const DEFAULT_COUNTRY_CODE = 'us';
const INACTIVITY_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

const HorizontalConnectionCard: React.FC<ConnectionCardProps> = ({ data }) => {
  // Handle null/undefined data
  if (!data) {
    return (
      <div className="font-sans rounded-lg overflow-hidden shadow-md bg-white flex h-20 w-full mt-2 items-center justify-center">
        <span className="text-gray-500 text-sm">No connection data available</span>
      </div>
    );
  }

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Unknown';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';

      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
      if (diffInSeconds < 86400) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const isActive = (): boolean => {
    try {
      if (!data.last_visit) return false;
      
      const lastVisit = new Date(data.last_visit);
      if (isNaN(lastVisit.getTime())) return false;
      
      return new Date().getTime() - lastVisit.getTime() < INACTIVITY_THRESHOLD;
    } catch (error) {
      console.error('Error checking activity status:', error);
      return false;
    }
  };

  const getCountryCode = (name: string | null | undefined): string => {
    if (!name) return DEFAULT_COUNTRY_CODE;

    const countryCodes: Record<string, string> = {
      india: 'in',
      usa: 'us',
      'united states': 'us',
      cambodia: 'kh',
      bangladesh: 'bd',
      'united kingdom': 'gb',
      germany: 'de',
      france: 'fr',
    };

    return countryCodes[name.toLowerCase()] || DEFAULT_COUNTRY_CODE;
  };

  // Derived values
  const countryCode = getCountryCode(data.country);
  const ipAddress = data.ip ? data.ip.replace('::ffff:', '') : 'Unknown';
  const isLocalhost = data.ip === '::1';
  const deviceDisplay = data.device && data.device !== 'unknown' ? data.device : 'Unknown';
  const hasCountryData = Boolean(data.country);

  return (
    <div className="font-sans rounded-lg overflow-hidden shadow-md bg-white flex h-20   mt-2">
      {/* Country Flag */}
      {hasCountryData && (
        <div
          className="w-20 h-full flex-shrink-0 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://flagcdn.com/w40/${countryCode.toLowerCase()}.jpg)`,
          }}
        >
          <div className="absolute bottom-1 left-1 text-white text-xs drop-shadow-md">
            <div className="font-semibold truncate max-w-[70px]">{data.country || 'Unknown'}</div>
            {data.region && (
              <div className="text-xxs opacity-90 truncate max-w-[70px]">{data.region}</div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow flex items-center px-3 py-1 overflow-x-auto">
        {/* Status Indicator */}
        <div className="flex items-center mr-3 min-w-[60px]">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-1 ${
              isActive() ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          <span className="text-xs">{isActive() ? 'Active' : 'Inactive'}</span>
        </div>

        {/* IP Address */}
        <div className="mr-3 min-w-[120px]">
          <div className="text-xxs text-gray-500">IP Address</div>
          <div className="font-mono text-xs truncate max-w-[120px]" title={ipAddress}>
            {ipAddress} {isLocalhost && '(localhost)'}
          </div>
        </div>

        {/* Device/OS */}
        <div className="mr-3 min-w-[120px]">
          <div className="text-xxs text-gray-500">Device / OS</div>
          <div className="text-xs truncate max-w-[120px]">
            {deviceDisplay} / {data.os || 'Unknown'}
          </div>
        </div>

        {/* Browser */}
        <div className="mr-3 min-w-[100px]">
          <div className="text-xxs text-gray-500">Browser</div>
          <div className="text-xs truncate max-w-[100px]" title={data.browser}>
            {data.browser || 'Unknown'}
          </div>
        </div>

        {/* Visits */}
        <div className="mr-3 min-w-[50px]">
          <div className="text-xxs text-gray-500">Visits</div>
          <div className="text-xs">
            {typeof data.visit_count === 'number' ? data.visit_count.toLocaleString() : '0'}
          </div>
        </div>

        {/* Last Visit */}
        <div className="mr-3 min-w-[80px]">
          <div className="text-xxs text-gray-500">Last Visit</div>
          <div className="text-xs">{formatDate(data.last_visit)}</div>
        </div>

        {/* Provider (if available) */}
        {data.provider && (
          <div className="mr-3 min-w-[120px]">
            <div className="text-xxs text-gray-500">Provider</div>
            <div className="text-xs truncate max-w-[120px]" title={data.provider}>
              {data.provider}
            </div>
          </div>
        )}

        {/* First Visit */}
        <div className="ml-auto text-gray-500 text-xxs min-w-[80px] text-right">
          <div>First Visit:</div>
          <div>{formatDate(data.first_visit)}</div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalConnectionCard;
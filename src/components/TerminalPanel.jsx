export default function TerminalPanel({
  pathname,
  commandInput,
  commandOutput,
  commandMatches,
  showCommandSuggestions,
  showIncidentLog,
  incidentLogs,
  artifacts,
  totalArtifactCount,
  setCommandInput,
  setHistoryIndex,
  runCommand,
  handleCommandInputKeyDown,
}) {
  return (
    <section className="mb-4 pb-3">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-stone-500">
        Terminal Mode // {pathname}
      </p>

      <form onSubmit={runCommand} className="mt-2">
        <label htmlFor="command-palette" className="sr-only">
          Terminal command input
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-2.5 py-2">
          <span className="font-mono text-[0.72rem] text-stone-500">$iamronney:</span>
          <input
            id="command-palette"
            type="text"
            value={commandInput}
            onChange={(event) => {
              setCommandInput(event.target.value)
              setHistoryIndex(-1)
            }}
            onKeyDown={handleCommandInputKeyDown}
            placeholder="whoami"
            className="w-full bg-transparent text-[0.78rem] text-stone-800 placeholder:text-stone-400 focus:outline-none"
            spellCheck="false"
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-md border border-stone-300 bg-stone-100 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-stone-700 hover:bg-stone-200"
          >
            Run
          </button>
        </div>
      </form>

      {showCommandSuggestions ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {commandMatches.slice(0, 6).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setCommandInput(suggestion)}
              className="rounded-md border border-stone-300 bg-stone-100 px-2 py-0.5 font-mono text-[0.62rem] text-stone-700 hover:bg-stone-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <p className="mt-2 font-mono text-[0.66rem] text-stone-600">
        &gt; {commandOutput}
      </p>

      <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-stone-500">
          Artifact Collection // {artifacts.length}/{totalArtifactCount}
        </p>
        <p className="mt-1 text-[0.66rem] text-stone-600">
          Route artifacts auto-capture on navigation. Easter egg artifacts unlock via terminal commands.
        </p>
      </div>

      {showIncidentLog ? (
        <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-stone-500">
            Incident Log // analyst console
          </p>

          <div className="mt-2 max-h-44 overflow-auto pr-1">
            {incidentLogs.map((entry) => (
              <div key={entry.id} className="grid grid-cols-[auto_auto_1fr] items-start gap-2 border-b border-stone-200/70 py-1.5 last:border-b-0">
                <span className="font-mono text-[0.58rem] text-stone-500">
                  {new Date(entry.timestamp).toLocaleTimeString('en-GB', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
                <span className={[
                  'font-mono text-[0.56rem] uppercase tracking-[0.1em]',
                  entry.level === 'success'
                    ? 'text-emerald-700'
                    : entry.level === 'warn'
                      ? 'text-amber-700'
                      : 'text-stone-500',
                ].join(' ')}>
                  {entry.code}
                </span>
                <span className="font-mono text-[0.62rem] text-stone-700">
                  {entry.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

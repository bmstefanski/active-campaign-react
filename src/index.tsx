import React from 'react'

interface ActiveCampaignInputsProps {
  formId: string
}

export function ActiveCampaignInputs({ formId }: ActiveCampaignInputsProps) {
  return (
    <>
      <input type="hidden" name="u" value={formId} />
      <input type="hidden" name="f" value={formId} />
      <input type="hidden" name="s" />
      <input type="hidden" name="c" value="0" />
      <input type="hidden" name="m" value="0" />
      <input type="hidden" name="act" value="sub" />
      <input type="hidden" name="v" value="2" />
    </>
  )
}

type Options = { fetcher: (formData: FormData, headers: any) => Promise<any> }
export function handleActiveCampaignSubmit<T extends Record<string, any>>(data: T, subdomain: string, formId: string, options?: Options) {
  const completeData = { u: formId, f: formId, s: '', c: '0', m: '0', act: 'sub', v: '2', ...data }

  try {
    let formData = new FormData()
    for (let key in completeData) {
      formData.append(key, completeData[key])
    }

    if (options?.fetcher) {
      options.fetcher(formData, { method: 'POST', mode: 'no-cors', cache: 'no-cache' })
      return
    }

    return fetch(`https://${subdomain}.activehosted.com/proc.php`, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: formData,
    })
  } catch (error) {
    throw new Error(`Request failed ${error}`)
  }
}
